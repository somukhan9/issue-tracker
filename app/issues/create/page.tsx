'use client'

import { useRouter } from 'next/navigation'
import { Button, TextField } from '@radix-ui/themes'
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
  const { register, control, handleSubmit } = useForm<IssueCreateForm>()

  return (
    <section>
      <form
        className="max-w-xl space-y-3"
        onSubmit={handleSubmit(async (data) => {
          await axios.post('/api/issues', data)
          router.replace('/issues')
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
