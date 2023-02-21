import Image from 'next/image';

export default function Example() {

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <Image
              className="mx-auto h-12 w-auto"
              src="/errenta.png"
              width={200}
              height={200}
              alt="Your Company"
            />
            <p className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              MFA
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
