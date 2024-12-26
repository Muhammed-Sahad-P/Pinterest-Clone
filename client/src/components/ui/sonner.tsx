"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, toast } from "sonner"
import ToastAction from "./ToastAction"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  const triggerToast = () => {
    const toastId = toast.custom((id: string | number) => {
      return (
        <div className="flex justify-between items-center p-4 bg-[#4CAF50] text-white rounded-lg shadow-lg">
          <span>{`Toast message with ID: ${id}`}</span>
          <ToastAction toastId={id as string} />
        </div>
      )
    })

    console.log(toastId)
  }

  return (
    <>
      <button onClick={triggerToast} className="bg-blue-500 text-white p-2 rounded">
        Show Toast
      </button>

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
