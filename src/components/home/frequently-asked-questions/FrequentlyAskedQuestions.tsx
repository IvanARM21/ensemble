import { frequentlyQuestions } from "@/seed"
import { FrequntlyQuestionItem } from "./FrequntlyQuestionItem"

export const FrequentlyAskedQuestions = () => {

  return (
    <div className="mt-8 flex flex-col">
        {frequentlyQuestions.map(item => (
            <FrequntlyQuestionItem key={item.id} item={item}/>
        ))}
    </div>
  )
}
