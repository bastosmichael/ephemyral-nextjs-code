"use client"

import { Button } from "@/components/ui/button"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import ShineBorder from "../magicui/shine-border"

export default function MainSection() {
  return (
    <section>
      <h1 className="text-primary text-balance bg-gradient-to-br bg-clip-text py-6 text-5xl font-medium leading-none tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
        Ship faster
        <br className="hidden md:block" /> with Ephemyral
      </h1>

      <p className="text-primary/80 mb-12 text-lg tracking-tight md:text-xl">
        Connect to your GitHub, <br className="hidden md:block" />
        fetch your repositories and issues, <br className="hidden md:block" />
        and generate LLM-created PRs!
      </p>

      <Link href="/onboarding">
        <Button>
          <span>Get started </span>
          <ArrowRightIcon className="ml-1 size-4" />
        </Button>
      </Link>
    </section>
  )
}
