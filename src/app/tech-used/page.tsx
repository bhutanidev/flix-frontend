import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface TechStackItem {
  name: string
  description: string
  icon: string
}

interface TechSection {
  title: string
  icon: string
  items: TechStackItem[]
}

const techStack: TechSection[] = [
  {
    title: "Backend",
    icon: "🔧",
    items: [
      {
        name: "Node.js + Express",
        description: "REST API",
        icon: "🟢"
      },
      {
        name: "TypeScript",
        description: "Scalable backend code",
        icon: "📘"
      },
      {
        name: "MongoDB",
        description: "Video metadata storage",
        icon: "🍃"
      },
      {
        name: "FFmpeg",
        description: "HLS video processing",
        icon: "🎬"
      },
      {
        name: "AWS SDK",
        description: "S3 uploads, CloudFront signing",
        icon: "☁️"
      }
    ]
  },
  {
    title: "DevOps & Infrastructure",
    icon: "⚙️",
    items: [
      {
        name: "Docker + Dev Containers",
        description: "Isolated local development",
        icon: "🐳"
      },
      {
        name: "Amazon S3",
        description: "File storage",
        icon: "📦"
      },
      {
        name: "CloudFront",
        description: "Secure video streaming (signed cookies)",
        icon: "🌐"
      },
      {
        name: "Vercel",
        description: "Frontend hosting",
        icon: "▲"
      },
      {
        name: "Ngrok",
        description: "Local HTTPS testing",
        icon: "🔗"
      }
    ]
  },
  {
    title: "Frontend",
    icon: "🧩",
    items: [
      {
        name: "Next.js (React)",
        description: "SSR + Routing",
        icon: "⚛️"
      },
      {
        name: "TypeScript",
        description: "Type-safe development",
        icon: "📘"
      },
      {
        name: "Video.js",
        description: "HLS video player",
        icon: "🎥"
      },
      {
        name: "Tailwind CSS",
        description: "Utility-first styling",
        icon: "🎨"
      },{
        name: "ShadCN",
        description: "UI component library",
        icon: "🖼️"
      }
    ]
  }
]

export default function BuiltWithPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            🚀 Built With
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The modern tech stack powering our video streaming platform
          </p>
        </div>

        {/* Tech Stack Sections */}
        <div className="space-y-12">
          {techStack.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              {/* Section Header */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{section.icon}</span>
                <h2 className="text-2xl font-semibold">{section.title}</h2>
              </div>

              {/* Tech Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {section.items.map((item, itemIndex) => (
                  <Card key={itemIndex} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{item.icon}</span>
                        <CardTitle className="text-lg font-medium">
                          {item.name}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm">
                        {item.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full">
            <span className="text-sm text-muted-foreground">
              Built with care for scalable video streaming
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}