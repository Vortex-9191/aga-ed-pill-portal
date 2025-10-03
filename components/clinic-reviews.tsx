"use client"

import { Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const mockReviews = [
  {
    id: "1",
    author: "田中太郎",
    rating: 5,
    date: "2025年1月15日",
    comment:
      "先生がとても親切で、丁寧に説明してくださいました。待ち時間も少なく、スムーズに診察を受けることができました。",
  },
  {
    id: "2",
    author: "佐藤花子",
    rating: 4,
    date: "2025年1月10日",
    comment: "清潔感のあるクリニックで、スタッフの方々も親切でした。駅から近いのも便利です。",
  },
  {
    id: "3",
    author: "鈴木一郎",
    rating: 5,
    date: "2025年1月5日",
    comment: "子供の診察でお世話になりました。キッズスペースがあり、子供も退屈せずに待つことができました。",
  },
]

const ratingDistribution = [
  { stars: 5, count: 85, percentage: 66 },
  { stars: 4, count: 30, percentage: 23 },
  { stars: 3, count: 10, percentage: 8 },
  { stars: 2, count: 3, percentage: 2 },
  { stars: 1, count: 1, percentage: 1 },
]

export function ClinicReviews({ averageRating, totalReviews }: { averageRating: number; totalReviews: number }) {
  return (
    <div className="space-y-6">
      {/* Rating Overview */}
      <Card>
        <CardHeader>
          <CardTitle>口コミ評価</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-[200px_1fr]">
            {/* Average Rating */}
            <div className="flex flex-col items-center justify-center text-center">
              <div className="text-5xl font-bold text-foreground mb-2">{averageRating}</div>
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(averageRating) ? "fill-accent text-accent" : "text-muted"}`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">{totalReviews}件の口コミ</p>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              {ratingDistribution.map((item) => (
                <div key={item.stars} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-16">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <span className="text-sm font-medium text-foreground">{item.stars}</span>
                  </div>
                  <Progress value={item.percentage} className="flex-1" />
                  <span className="text-sm text-muted-foreground w-12 text-right">{item.count}件</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <Card>
        <CardHeader>
          <CardTitle>口コミ一覧</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {mockReviews.map((review) => (
            <div key={review.id} className="border-b border-border last:border-0 pb-6 last:pb-0">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarFallback className="bg-secondary text-secondary-foreground">
                    {review.author.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-foreground">{review.author}</p>
                    <span className="text-sm text-muted-foreground">{review.date}</span>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? "fill-accent text-accent" : "text-muted"}`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
