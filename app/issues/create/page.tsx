'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Button, Callout, TextField, Text } from '@radix-ui/themes'
import { useForm, Controller } from 'react-hook-form'
import SimpleMDE from 'react-simplemde-editor'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { z } from 'zod'
import { createIssueSchema } from '@/helpers/validationSchema'

import 'easymde/dist/easymde.min.css'

type IssueCreateForm = z.infer<typeof createIssueSchema>

export default function CreateIssuePage() {
  const router = useRouter()
  const [error, setError] = React.useState<string>('')
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueCreateForm>({
    resolver: zodResolver(createIssueSchema),
  })

  return (
    <section className="max-w-xl">
      {error && (
        <Callout.Root className="mb-5">
          <Callout.Text color="red">{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="max-w-xl space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post('/api/issues', data)
            router.replace('/issues')
          } catch (error) {
            setError('Unexpected error occurred!')
          }
        })}
      >
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register('title')} />
        </TextField.Root>
        {errors.title && (
          <Text color="red" as="p">
            {errors.title.message}
          </Text>
        )}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        {errors.description && (
          <Text color="red" as="p">
            {errors.description.message}
          </Text>
        )}
        <Button className="cursor-pointer">Submit New Issue</Button>
      </form>
    </section>
  )
}
