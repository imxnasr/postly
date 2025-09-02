import { CleanHTML } from "@/components/CleanHTML";
import { Avatar, AvatarFallback, AvatarImage, HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui";
import { db } from "@/db";

export default async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const data = await db.query.post.findFirst({
    where: (post, { eq }) => eq(post.id, id),
    with: {
      user: true,
    },
  });
  const { title, content, user, createdAt } = data as any;
  const { name, username, bio } = user;
  const avatarFallback = name.substring(0, 2).toUpperCase();
  return (
    <div className="mt-14">
      {/* User Info */}
      <HoverCard>
        <div className="flex items-center gap-4 mb-3">
          <Avatar className="size-16">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="text-2xl">{avatarFallback}</AvatarFallback>
          </Avatar>
          {/* Texts */}
          <div className="flex flex-col">
            <HoverCardTrigger
              href={`/@${username}`}
              className="text-2xl font-bold -mb-1 hover:underline cursor-pointer"
            >
              {name}
            </HoverCardTrigger>
            <div className="text-lg text-muted-foreground">{new Date(createdAt).toDateString()}</div>
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
      {/* Post content */}
      <div className="mt-16">
        {/* Title */}
        <h1 className="text-4xl font-semibold mb-10">{title}</h1>
        {/* Body */}
        <CleanHTML>{content}</CleanHTML>
      </div>
    </div>
  );
};
