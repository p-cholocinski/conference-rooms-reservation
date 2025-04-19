'use client'

import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { useToast } from "@/hooks/useToast"
import Form from "next/form"
import TextInput from "@/components/inputs/TextInput"
import Button from "@/components/Button"
import FormLayout from "@/app/components/Forms/FormLayout"

export default function SignInContent() {
  const router = useRouter()
  const toast = useToast()
  const searchParams = useSearchParams()

  const callbackUrl = searchParams.get("callbackUrl") || "/"

  const credentialsAction = async (FormData: FormData) => {
    const email = FormData.get("email")?.toString()
    const password = FormData.get("password")?.toString()

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl
    })

    if (res?.error) {
      toast("error", "Niepoprawny email lub hasło")
    } else if (res?.ok) {
      toast("success", "Zalogowano pomyślnie")
      router.push(res.url || callbackUrl)
    }
  }

  return (
    <FormLayout withCreatePortalBody={false}>
      <Form action={credentialsAction}>
        <div className="flex flex-col gap-4">
          <TextInput
            name="email"
            placeholder="Email"
            type="email"
          />
          <TextInput
            name="password"
            placeholder="Password"
            type="password"
          />
          <Button
            type="submit"
          >
            Zaloguj
          </Button>
        </div>
      </Form>
    </FormLayout>
  )
}