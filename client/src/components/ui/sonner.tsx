"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <>

      <Sonner
        theme={theme as ToasterProps["theme"]}
        className="toaster group"
        toastOptions={{
          classNames: {
            toast:
              "group toast group-[.toaster]:bg-[#E60023] group-[.toaster]:text-white group-[.toaster]:border-transparent group-[.toaster]:shadow-lg",
            description: "group-[.toast]:text-sm group-[.toast]:font-light",
            actionButton:
              "group-[.toast]:bg-[#FF5722] group-[.toaster]:text-white hover:bg-[#E64A19] flex items-center justify-center p-2 rounded-full",
            cancelButton:
              "group-[.toast]:bg-[#9E9E9E] group-[.toaster]:text-white hover:bg-[#757575]",
          },
          duration: 3000,
        }}
        {...props}
      />
    </>
  )
}

export { Toaster }
