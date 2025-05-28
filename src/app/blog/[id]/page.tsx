import { getPost, getCategory } from "@/lib/client";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TableOfContents } from "@/components/TableOfContents";
import { NavBar } from "@/components/NavBar";
import type { Metadata } from "next";

export const dynamic = 'force-dynamic'; // ★ 追加

// カテゴリー型を追加
type Category = {
  id: string;
  name: string;
};

// Props型を追加
type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// generateMetadataを追加
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const post = await getPost(params.id);
    return {
      title: post?.title || "ブログ記事",
      description: post?.content?.substring(0, 100) || "ブログ記事詳細",
    };
  } catch {
    return {
      title: "エラー",
      description: "記事の読み込みに失敗しました",
    };
  }
}

// ★ 追加
export async function generateStaticParams() {
  return [];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function BlogPost({ params, searchParams: _searchParams }: Props) {
  try {
    const post = await getPost(params.id);
    const categories = await getCategory();

    // データが取得できなかった場合はnotFoundを呼ぶ
    if (!post || !categories) {
      notFound();
    }

    return (
      <div className="min-h-screen bg-white">
        <NavBar />
        <div className="max-w-screen-xl mx-auto px-2 py-8 flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* メインコンテンツ */}
          <article className="flex-1 bg-white rounded-lg">
            <div className="max-w-3xl mx-auto px-2 sm:px-4 md:px-8">
              <header className="mb-0">
                {/* タイトルを削除 */}
              </header>

              {/* サムネイル画像の存在チェック */}
              {post.thumbnail?.url && (
                <div className="relative w-full aspect-video mb-4 rounded-lg overflow-hidden ">
                  <Image
                    src={post.thumbnail.url}
                    alt={post.title || ""}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              <h1
                id="heading1"
                className="font-bold text-gray-900 mb-4 text-left text-2xl sm:text-3xl md:text-3xl lg:text-4xl leading-tight"
              >
                {post.title}
              </h1>

              <div className="flex flex-wrap gap-2 sm:gap-4 text-gray-600 text-xs sm:text-sm md:text-base mb-8">
                <time>
                  {/* publishedAtの存在チェック */}
                  {post.publishedAt
                    ? format(new Date(post.publishedAt), "yyyy年MM月dd日", { locale: ja })
                    : ""}
                </time>
                {/* カテゴリーのタグを日付の横に移動 */}
                <div className="flex gap-2">
                  {categories.contents?.map((category: Category) => (
                    <Link
                      key={category.id}
                      href={`/category/${category.id}`}
                      className="bg-blue-100 text-blue-800 text-xs sm:text-xs md:text-sm font-semibold mr-2 px-2.5 py-0.5 rounded"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div
                className="
                  prose
                  prose-base
                  sm:prose-lg
                  md:prose-base
                  max-w-none
                  prose-headings:text-gray-900
                  prose-p:text-gray-700
                  prose-a:text-blue-600
                  prose-strong:text-gray-900
                  prose-code:text-gray-900
                  prose-pre:bg-gray-100
                  prose-pre:text-gray-900
                  prose-headings:scroll-mt-20
                  prose-h1:text-2xl sm:prose-h1:text-3xl md:prose-h1:text-3xl lg:prose-h1:text-4xl
                  prose-h2:text-xl sm:prose-h2:text-2xl md:prose-h2:text-2xl
                  prose-h3:text-lg sm:prose-h3:text-xl md:prose-h3:text-xl
                "
                dangerouslySetInnerHTML={{ __html: post.content || "" }}
              />
            </div>
          </article>

          {/* サイドバー */}
          <aside className="hidden lg:block lg:w-80 w-full">
            <TableOfContents />
          </aside>
        </div>
      </div>
    );
  } catch {
    notFound();
  }
}
