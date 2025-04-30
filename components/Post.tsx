import { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage, Badge, Card, HoverCard, HoverCardContent, HoverCardTrigger } from "./ui";
import { Bookmark, Heart, MessageSquare } from "lucide-react";
import Link from "next/link";
import { ActionBtn } from "./post/ActionBtn";

interface PostProps {}

export const Post: FC<PostProps> = () => {
  return (
    <Card className="p-4">
      {/* Header */}
      <HoverCard>
        <div className="flex items-center gap-2 mb-3">
          <Avatar className="size-10">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>IM</AvatarFallback>
          </Avatar>
          {/* Texts */}
          <div className="flex flex-col">
            <HoverCardTrigger href="/@shadcn" className="text-xl font-bold -mb-1 hover:underline cursor-pointer">
              Shadcn
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
      {/* Content */}
      <div className="text-md line-clamp-3 leading-5 text-muted-foreground my-2">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores atque aspernatur quod reiciendis modi. Ipsum
        iusto aliquam voluptas et magnam in nesciunt fugit accusamus, tempora saepe dolores dolore doloribus beatae
        exercitationem, dignissimos reprehenderit deserunt aperiam repudiandae maiores, eum similique. Dolorem ratione
        quisquam porro natus molestias alias sequi voluptatem magnam provident?
      </div>
      {/* Tags */}
      <div className="flex items-center gap-2 *:text-xs *:rounded-full overflow-auto *:cursor-default mb-2 scrollbar-none">
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
