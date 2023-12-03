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
import ErrorMessage from '@/app/components/ErrorMessage'
import Spinner from '@/app/components/Spinner'

type IssueCreateForm = z.infer<typeof createIssueSchema>

export default function CreateIssuePage() {
  const router = useRouter()
  const [error, setError] = React.useState<string>('')
  const [loading, setLoading] = React.useState<boolean>(false)

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
          setLoading(true)
          try {
            await axios.post('/api/issues', data)
            router.replace('/issues')
          } catch (error) {
            setError('Unexpected error occurred!')
          } finally {
            setLoading(true)
          }
        })}
      >
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register('title')} />
        </TextField.Root>

        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={loading} className="cursor-pointer">
          Submit New Issue
          {loading && <Spinner />}
        </Button>
      </form>
    </section>
  )
}
