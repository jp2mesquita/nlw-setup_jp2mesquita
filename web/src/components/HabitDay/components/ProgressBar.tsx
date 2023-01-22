import * as Progress from '@radix-ui/react-progress'

interface ProgressBarProps {
  progress: number
}

export function ProgressBar({ progress }: ProgressBarProps) {


  return (
    <Progress.Root className="h-3 rounded-xl bg-zinc-700 w-full mt-4">
      <Progress.Indicator
        className="h-3 rounded-xl bg-violet-600 transition-all"
        style={{ width: `${progress}%` }}
      />
    </Progress.Root>

    // <div className="h-3 rounded-xl bg-zinc-700 w-full mt-4">
    //   <div
    //     role='progressbar'
    //     aria-label='Progresso de Hábitos nesse dia'
    //     aria-valuenow={75}
    //     className="h-3 rounded-xl bg-violet-600 w-3/4"
    //   />
    // </div>
  )
}