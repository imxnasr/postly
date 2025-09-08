"use client";

import { likePost } from "@/actions/like-post";
import { savePost, unsavePost } from "@/actions/save-post";
import { Bookmark, BookmarkCheck, Heart, MessageSquare } from "lucide-react";
import Link from "next/link";
import { FC, useState } from "react";
import { toast } from "sonner";
import { CleanHTML } from "./CleanHTML";
import { ActionBtn } from "./post/ActionBtn";
import { Avatar, AvatarFallback, AvatarImage, Badge, Card, HoverCard, HoverCardContent, HoverCardTrigger } from "./ui";

interface PostProps {
  data: any;
}

export const Post: FC<PostProps> = ({ data }) => {
  const { id, title, content, user, savedPost, isSaved, postLikes, isLiked } = data;
  const { name, username, bio, image } = user;

  const avatarFallback = name.substring(0, 2).toUpperCase();
  const [isSaving, setIsSaving] = useState(false);
  const [savedCount, setSavedCount] = useState<number>(savedPost?.length || 0);
  const [savedActive, setSavedActive] = useState<boolean>(isSaved || false);
  const [likedCount, setLikedCount] = useState<number>(postLikes?.length || 0);
  const [likedActive, setLikedActive] = useState<boolean>(isLiked || false);

  const handleSavePost = async () => {
    setIsSaving(true);
    try {
      const res = await savePost(id);
      if (res.success) {
        toast.success(res.message);
        setSavedCount((prev) => prev + 1);
        setSavedActive(true);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("An unexpected error occurred while saving the post.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleUnsavePost = async () => {
    setIsSaving(true);
    try {
      const res = await unsavePost(id);
      if (res.success) {
        toast.success(res.message);
        setSavedCount((prev) => prev - 1);
        setSavedActive(false);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("An unexpected error occurred while unsaving the post.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLikePost = async () => {
    try {
      setLikedActive((prev) => !prev);
      setLikedCount((prev) => (likedActive ? prev - 1 : prev + 1));
      const res = await likePost(id);
      if (!res.success) {
        toast.error("An unexpected error occurred while liking the post.");
        setLikedActive((prev) => !prev);
        setLikedCount((prev) => (likedActive ? prev + 1 : prev - 1));
      }
    } catch (error) {
      toast.error("An unexpected error occurred while liking the post.");
      setLikedActive((prev) => !prev);
      setLikedCount((prev) => (likedActive ? prev + 1 : prev - 1));
    }
  };

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
          <ActionBtn
            name="Like"
            num={likedCount}
            Icon={Heart}
            ActiveIcon={Heart}
            active={likedActive}
            onClickActive={handleLikePost}
            onClickInActive={handleLikePost}
          />
          <ActionBtn name="Comment" num={37} Icon={MessageSquare} ActiveIcon={MessageSquare} />
        </div>
        <ActionBtn
          name="Bookmark"
          num={savedCount}
          Icon={Bookmark}
          ActiveIcon={BookmarkCheck}
          active={savedActive}
          onClickActive={handleSavePost}
          onClickInActive={handleUnsavePost}
          isLoading={isSaving}
        />
      </div>
    </Card>
  );
};
