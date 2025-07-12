CREATE TABLE "tag_to_post" (
	"post_id" text NOT NULL,
	"tag_id" text NOT NULL,
	CONSTRAINT "tag_to_post_post_id_tag_id_pk" PRIMARY KEY("post_id","tag_id")
);
--> statement-breakpoint
ALTER TABLE "tag_to_post" ADD CONSTRAINT "tag_to_post_post_id_post_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."post"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tag_to_post" ADD CONSTRAINT "tag_to_post_tag_id_tag_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tag"("id") ON DELETE cascade ON UPDATE no action;