import { signOut } from "@/auth";
import { redirect } from "next/navigation";
import FormLayout from "@/components/forms/FormLayout";
import Button from "@/components/Button";
import Form from "next/form";

export default function SignOut() {
  return (
    <FormLayout withCreatePortalBody={false}>
      <Form action={async () => {
        "use server"
        await signOut({ redirect: false })
        redirect("/auth/signin")
      }}>
        <div className="flex flex-col gap-4">
          <p className="text-center text-2xl">Wylogowywanie</p>
          <p className="text-center text-lg">Czy na pewno chcesz się wylogować?</p>
          <div className="flex justify-center">
            <Button type="submit" className="w-full">Wyloguj</Button>
          </div>
        </div>
      </Form>
    </FormLayout >
  )
}