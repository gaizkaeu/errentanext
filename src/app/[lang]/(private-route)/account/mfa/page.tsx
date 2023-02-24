import { MFAAuthForm } from "@/components/authentication";

export default function Example() {

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <p className="mt-6 text-center text-3xl font-bold tracking-tight">
              MFA
            </p>
          </div>
          <MFAAuthForm />
        </div>
      </div>
    </>
  )
}
