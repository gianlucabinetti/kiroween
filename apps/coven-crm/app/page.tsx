import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-background">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-text-primary">🔮 Coven CRM</h1>
        <p className="text-xl text-text-secondary max-w-2xl">
          A mystical CRM for tracking contacts, companies, and interactions. Guide your contacts
          through the enchanted pipeline: Familiar → Enchanting → Bewitched.
        </p>
        <div className="flex gap-4 justify-center mt-8">
          <Link
            href="/login"
            className="px-6 py-3 bg-accent-purple hover:bg-accent-purple/90 text-text-primary rounded-md transition-colors"
          >
            Enter the Circle
          </Link>
          <a
            href="https://github.com/yourusername/grimoire-stack"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-border hover:border-accent-purple text-text-primary rounded-md transition-colors"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </main>
  )
}
