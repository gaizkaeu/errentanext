import { SignInComponent } from '@/components/authentication/actions';
import Image from 'next/image';
import Link from 'next/link';

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
            <p className="mt-6 text-center text-3xl font-bold tracking-tight ">
              Sign in to your account
            </p>
            <p className="mt-2 text-center text-sm ">
              Or{' '}
              <Link href="#">
                sign-up
              </Link>
            </p>
            <SignInComponent />
          </div>
        </div>
      </div>
    </>
  )
}
