import { Bookmark, Heart, MessageSquare } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import { ActionBtn } from "./post/ActionBtn";
import { CleanHTML } from "./CleanHTML";
import { Avatar, AvatarFallback, AvatarImage, Badge, Card, HoverCard, HoverCardContent, HoverCardTrigger } from "./ui";

interface PostProps {
  data: any;
}

export const Post: FC<PostProps> = ({ data }) => {
  const { id, title, content, user } = data;
  const { name, username, bio, image } = user;
  const avatarFallback = name.substring(0, 2).toUpperCase();

  return (
    <Card className="p-4">
      {/* Header */}
      <HoverCard>
        <div className="flex items-center gap-2 mb-3">
          <Avatar className="size-10">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
          {/* Texts */}
          <div className="flex flex-col">
            <HoverCardTrigger href={`/@${username}`} className="text-xl font-bold -mb-1 hover:underline cursor-pointer">
              {name}
            </HoverCardTrigger>
            <div className="text-sm">@{username}</div>
          </div>
        </div>
        {/* Hover Card */}
        <HoverCardContent>
          <div className="flex items-center gap-2 mb-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>{avatarFallback}</AvatarFallback>
            </Avatar>
            {/* Texts */}
            <div className="flex flex-col">
              <div className="text-xl font-bold -mb-1">{name}</div>
              <div className="text-sm">@{username}</div>
            </div>
          </div>
          {/* Description */}
          {bio && <div>{bio}</div>}
        </HoverCardContent>
      </HoverCard>
      {/* Title */}
      <Link href={`/post/${id}`}>
        <h1 className="text-xl font-bold mb-2">{title}</h1>
      </Link>
      {/* Content */}
      <CleanHTML className="text-md line-clamp-3 leading-5 text-muted-foreground my-2 [&_h2]:text-base [&_h2]:my-2">
        {content}
      </CleanHTML>
      {/* Tags */}
      <div className="flex items-center gap-2 *:text-xs *:rounded-full overflow-auto *:cursor-default my-2 scrollbar-none">
        <Badge variant="outline">react</Badge>
        <Badge variant="outline">nextjs</Badge>
        <Badge variant="outline">tailwindcss</Badge>
        <Badge variant="outline">supabase</Badge>
      </div>
      {/* Actions */}
      <div className="flex items-center justify-between text-sm mt-3">
        <div className="flex gap-2 items-center">
          <ActionBtn name="Like" num={100} Icon={Heart} />
          <ActionBtn name="Comment" num={37} Icon={MessageSquare} />
        </div>
        <ActionBtn name="Bookmark" num={37} Icon={Bookmark} />
      </div>
    </Card>
  );
};
