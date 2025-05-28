import { getPosts } from "@/lib/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import type { Post } from "@/lib/client";
import { NavBar } from "@/components/NavBar";

export default async function Home() {
  const { contents } = await getPosts();

  return (
    <main className="min-h-screen bg-[#ffffff]">
      {/* NavBarをスマホでは非表示に */}
      <div className="hidden sm:block">
        <NavBar />
      </div>
      <div className="container mx-auto px-4 py-8">
        {/* <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">マネー部</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            お金に関する知識をわかりやすく解説。投資、貯金、節約など、あなたの資産形成をサポートします。
          </p>
        </div> */}

        {/* Search Bar */}
        {/* <div className="mb-8">
          <input
            type="text"
            placeholder="検索..."
            className="w-full p-3 rounded-lg bg-[#f1f1f1] text-black border border-gray-300"
          />
        </div> */}

        {/* Category Filters */}
        {/* <div className="flex justify-left mb-8 space-x-4">
          <button className="px-4 py-2 bg-gray-100 text-black rounded-lg hover:cursor-pointer">すべて</button>
          <button className="px-4 py-2 bg-gray-100 text-black rounded-lg hover:cursor-pointer">投資</button>
          <button className="px-4 py-2 bg-gray-100 text-black rounded-lg hover:cursor-pointer">貯金</button>
          <button className="px-4 py-2 bg-gray-100 text-black rounded-lg hover:cursor-pointer">節約</button>
        </div> */}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
          {contents.map((post: Post) => (
            <Link key={post.id} href={`/blog/${post.id}`}>
              <Card className="overflow-hidden bg-[#ffffff] hover:cursor-pointer">
                {post.thumbnail?.url && (
                  <div className="relative w-full h-54 rounded-lg overflow-hidden">
                    <Image
                      src={post.thumbnail.url}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    />
                  </div>
                )}
                <CardHeader className="p-2 pt-3 pb-0">
                  <CardTitle className="text-base text-black line-clamp-2">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-2 pt-0">
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <time>
                      {format(
                        new Date(post.publishedAt),
                        "yyyy年MM月dd日",
                        {
                          locale: ja,
                        }
                      )}
                    </time>
                    {/* <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs">
                      お金の知識
                    </span> */}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
