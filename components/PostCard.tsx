"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Edit, Trash2, MoreHorizontal } from "lucide-react"
import { CommentSection } from "./CommentSection"
import { EditPostForm } from "./EditPostForm"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Post {
  id: number
  title: string
  content: string
  created_at: string
  author: {
    id: number
    name: string
  }
  comments: Array<{
    id: number
    content: string
    created_at: string
    user: {
      id: number
      name: string
    }
  }>
  likes: Array<{
    id: number
    user_id: number
  }>
}

interface PostCardProps {
  post: Post
  currentUser: any
  onPostDeleted: (postId: number) => void
  onPostUpdated: (post: Post) => void
}

// Função para formatar data com segurança
const formatDate = (dateString: string) => {
  if (!dateString) return "Data não disponível"

  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return "Data inválida"

    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  } catch (error) {
    console.error("Erro ao formatar data:", error)
    return "Data inválida"
  }
}

export function PostCard({ post, currentUser, onPostDeleted, onPostUpdated }: PostCardProps) {
  const [showComments, setShowComments] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [liked, setLiked] = useState(
    currentUser && post.likes ? post.likes.some((like) => like.user_id === currentUser.id) : false,
  )
  const [likesCount, setLikesCount] = useState(post.likes ? post.likes.length : 0)

  const isAuthor = currentUser?.id === post.author?.id

  const handleLike = async () => {
    if (!currentUser) return

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`http://localhost:5000/api/likes/${post.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setLiked(data.liked)
        setLikesCount((prev) => (data.liked ? prev + 1 : prev - 1))
      } else {
        console.error("Erro ao curtir:", await response.text())
      }
    } catch (error) {
      console.error("Erro ao curtir post:", error)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja excluir este post?")) return    

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`http://localhost:5000/api/posts/${post.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        onPostDeleted(post.id)
      }
    } catch (error) {
      console.error("Erro ao excluir post:", error)
    }
  }

  const handlePostUpdated = (updatedPost: Post) => {
    onPostUpdated(updatedPost)
    setIsEditing(false)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <Link href={`/user/${post.author?.id}`} className="text-sm font-medium text-blue-600 hover:text-blue-500">
              {post.author?.name}
            </Link>
            <p className="text-xs text-gray-500 mt-1">{formatDate(post?.created_at)}</p>
          </div>

          {isAuthor && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsEditing(true)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Excluir
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>

      <CardContent>
        {isEditing ? (
          <EditPostForm post={post} onPostUpdated={handlePostUpdated} onCancel={() => setIsEditing(false)} />
        ) : (
          <>
            <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
            <p className="text-gray-700 mb-4 whitespace-pre-wrap">{post.content}</p>

            <div className="flex items-center space-x-4 mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={`flex items-center space-x-1 ${liked ? "text-red-500" : "text-gray-500"}`}
                disabled={!currentUser}
              >
                <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
                <span>{likesCount}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowComments(!showComments)}
                className="flex items-center space-x-1 text-gray-500"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{post.comments ? post.comments.length : 0}</span>
              </Button>
            </div>

            {showComments && (
              <CommentSection postId={post.id} comments={post.comments || []} currentUser={currentUser} />
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
