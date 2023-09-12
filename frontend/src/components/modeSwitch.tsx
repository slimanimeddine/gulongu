import { useState } from 'react'
import { Switch } from '@headlessui/react'
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from './svgIcons';

export function ModeSwitch() {
  const [enabled, setEnabled] = useState(false)
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <Switch
        checked={enabled}
        onChange={() => {
          setEnabled(!enabled)
          if (theme == "dark") {
            setTheme('light')
          } else {
            setTheme("dark")
          }
        }}
        className={`${theme === "dark" ? 'bg-gray-400' : 'bg-gray-100'}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${theme === "dark" ? 'translate-x-9 bg-black' : 'translate-x-0 bg-white'}
           flex items-center justify-center pointer-events-none  h-[34px] w-[34px] transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out`}
        >
          {
            theme === "dark" ?
              <MoonIcon />
              : <SunIcon />
          }
        </span>
      </Switch>
    </div>
  )
}