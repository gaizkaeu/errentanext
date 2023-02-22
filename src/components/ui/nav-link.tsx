'use client';

import { Link } from 'next-intl';
import { usePathname } from 'next-intl/client';
import { Button as ShadCNButton, ButtonProps, buttonVariants } from './button';
import { cn } from '@/lib/utils';
import React from 'react';



const Button = React.forwardRef<HTMLButtonElement, ButtonProps & {href: string }>(
  ({ className, variant, size, href, ...props }, ref) => {

    const pathname = usePathname();
    const isActive = pathname === href;
    variant = isActive ? "subtle" : "ghost";

    return (
      <Link href={href}>
        <button
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        />
      </Link>
    )
  }
)
Button.displayName = "Button"


export const NavLink = ({ href, children, text, ...rest  }: { href: string, children?: (arg0: boolean) => JSX.Element; text: string; }) => {

  const pathname = usePathname();
  const isActive = pathname === href;

  if (children) {
    return (
      <Link href={href} >
        {children(isActive)}
      </Link>
    )
  } else {
    return (
      <Link href={href} >
        <ShadCNButton variant={isActive ? "subtle" : "ghost"} size="sm" className="w-full justify-start">
          {text}
        </ShadCNButton>
      </Link>
    )
  }
}
