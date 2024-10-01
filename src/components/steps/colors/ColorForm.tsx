import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { useColorStore } from '@/store';
import { Alert, Tooltip } from '@/components'
import { StepHeader } from "../StepHeader";

export const ColorForm = () => {

  const { alert, color, onChange } = useColorStore();

  return (
    <>
        <StepHeader title="Form color" description="You can create a color by filling in the following fields."/>

        <form action="" className="flex flex-col gap-5">
            {alert.message && (
                <Alert {...alert} />
            )}

            <div className="flex flex-col gap-2">
                <label htmlFor="label" className="text-gray-800 font-medium leading-6">Label</label>
                <input 
                type="text"
                id="label"
                placeholder="Label color, example: Black"
                className="rounded-xl py-3 px-4 bg-gray-50 placeholder:text-gray-400 text-sm text-gray-900"
                value={color.label}
                onChange={event => onChange(event)}
                />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="code" className="text-gray-800 font-medium leading-6">Color picker</label>
                <div className="flex gap-2">
                <input 
                    type="color"
                    id="code"
                    onChange={event => onChange(event)}
                    value={color.code}
                    className="p-2 h-11 w-20 block bg-gray-50 border-none cursor-pointer rounded-xl "
                />
                <input 
                    type="text"  
                    value={color.code}
                    id="code"
                    onChange={event => onChange(event)}
                    placeholder="Code color. Example #000"
                    className="rounded-xl py-3 px-4 bg-gray-50 placeholder:text-gray-400 text-sm text-gray-900"
                />
                
                <Tooltip side="right" content="Enter a hex color code (e.g., #2563eb) or use the color picker.">
                    <InformationCircleIcon 
                        className="size-6 text-gray-700"
                    />
                </Tooltip>
            </div>
        </div>
        </form>
    </>
  )
}
