import { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage, Badge, Card, HoverCard, HoverCardContent, HoverCardTrigger } from "./ui";
import { Bookmark, Heart, MessageSquare } from "lucide-react";
import Link from "next/link";

interface PostProps {}

const iconSize = 22;

export const Post: FC<PostProps> = () => {
  return (
    <Card className="bg-card p-4">
      {/* Header */}
      <HoverCard>
        <div className="flex items-center gap-2 mb-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>IM</AvatarFallback>
          </Avatar>
          {/* Texts */}
          <div className="flex flex-col">
            <HoverCardTrigger>
              <Link href="/profile/shadcn">
                <div className="text-xl font-bold -mb-1 hover:underline">Shadcn</div>
              </Link>
            </HoverCardTrigger>
            <div className="text-sm">@shadcn</div>
          </div>
        </div>
        {/* Hover Card */}
        <HoverCardContent>
          <div className="flex items-center gap-2 mb-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>IM</AvatarFallback>
            </Avatar>
            {/* Texts */}
            <div className="flex flex-col">
              <div className="text-xl font-bold -mb-1">Shadcn</div>
              <div className="text-sm">@shadcn</div>
            </div>
          </div>
          {/* Description */}
          <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, inventore.</div>
        </HoverCardContent>
      </HoverCard>
      {/* Title */}
      <Link href="/post/1">
        <h1 className="text-lg font-bold mb-2">Is Friday really an exciting day?🎉🥳</h1>
      </Link>
      {/* Tags */}
      <div className="flex items-center gap-2 *:text-xs *:rounded-full overflow-hidden *:cursor-default mb-2">
        <Badge variant="outline">react</Badge>
        <Badge variant="outline">nextjs</Badge>
        <Badge variant="outline">tailwindcss</Badge>
        <Badge variant="outline">supabase</Badge>
      </div>
      {/* Actions */}
      <div className="flex items-center justify-between text-sm px-1">
        <div className="flex gap-2 items-center">
          <Heart size={iconSize} />
          <MessageSquare size={iconSize} />
        </div>
        <Bookmark size={iconSize} />
      </div>
    </Card>
  );
};
