'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Button, Callout, TextField } from '@radix-ui/themes'
import { useForm, Controller } from 'react-hook-form'
import SimpleMDE from 'react-simplemde-editor'
import axios from 'axios'

import 'easymde/dist/easymde.min.css'

type IssueCreateForm = {
  title: string
  description: string
}

export default function CreateIssuePage() {
  const router = useRouter()
  const [error, setError] = React.useState<string>('')
  const { register, control, handleSubmit } = useForm<IssueCreateForm>()

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
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <Button className="cursor-pointer">Submit New Issue</Button>
      </form>
    </section>
  )
}
