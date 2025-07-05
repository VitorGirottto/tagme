"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Edit, Trash2, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Comment {
  id: number
  content: string
  created_at: string
  user: {
    id: number
    name: string
  }
}

interface CommentSectionProps {
  postId: number
  comments: Comment[]
  currentUser: any
}

export function CommentSection({ postId, comments: initialComments = [], currentUser }: CommentSectionProps) {
  const [comments, setComments] = useState(initialComments || [])
  const [newComment, setNewComment] = useState("")
  const [editingComment, setEditingComment] = useState<number | null>(null)
  const [editContent, setEditContent] = useState("")
  const [loading, setLoading] = useState(false)

  const handleAddComment = async () => {
    if (!newComment.trim() || !currentUser) return

    setLoading(true)
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("http://localhost:5000/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: newComment,
          post_id: postId,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setComments([...comments, data.comment])
        setNewComment("")
      } else {
        console.error("Erro ao adicionar comentário:", data.message)
        alert("Erro ao adicionar comentário: " + data.message)
      }
    } catch (error) {
      console.error("Erro ao adicionar comentário:", error)
      alert("Erro ao adicionar comentário")
    } finally {
      setLoading(false)
    }
  }

  const handleEditComment = async (commentId: number) => {
    if (!editContent.trim()) return

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`http://localhost:5000/api/comments/${commentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: editContent }),
      })

      const data = await response.json()

      if (response.ok) {
        setComments(comments.map((comment) => (comment.id === commentId ? data.comment : comment)))
        setEditingComment(null)
        setEditContent("")
      } else {
        console.error("Erro ao editar comentário:", data.message)
        alert("Erro ao editar comentário: " + data.message)
      }
    } catch (error) {
      console.error("Erro ao editar comentário:", error)
      alert("Erro ao editar comentário")
    }
  }

  const handleDeleteComment = async (commentId: number) => {
    console.log("Tentando excluir comentário ID:", commentId)
    console.log("Usuário atual:", currentUser)

    if (!confirm("Tem certeza que deseja excluir este comentário?")) return

    try {
      const token = localStorage.getItem("token")
      console.log("Token:", token ? "Presente" : "Ausente")

      const response = await fetch(`http://localhost:5000/api/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      console.log("Resposta da API:", response.status, response.statusText)

      if (response.ok) {
        setComments(comments.filter((comment) => comment.id !== commentId))
        alert("Comentário excluído com sucesso!")
      } else {
        const errorData = await response.json()
        console.error("Erro ao excluir comentário:", errorData)
        alert("Erro ao excluir comentário: " + errorData.message)
      }
    } catch (error) {
      console.error("Erro ao excluir comentário:", error)
      alert("Erro ao excluir comentário")
    }
  }

  const startEditing = (comment: Comment) => {
    setEditingComment(comment.id)
    setEditContent(comment.content)
  }

  return (
    <div className="border-t pt-4">
      <h4 className="font-medium mb-3">Comentários ({comments.length})</h4>

      {currentUser && (
        <div className="mb-4">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Escreva um comentário..."
            rows={3}
            className="mb-2"
          />
          <Button
            onClick={handleAddComment}
            disabled={!newComment.trim() || loading}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700"
          >
            {loading ? "Enviando..." : "Comentar"}
          </Button>
        </div>
      )}

      <div className="space-y-3">
        {comments && comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <Link
                    href={`/user/${comment.user.id}`}
                    className="text-sm font-medium text-blue-600 hover:text-blue-500"
                  >
                    {comment.user.name}
                  </Link>
                  <p className="text-xs text-gray-500">
                    {new Date(comment.created_at).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                {currentUser?.id === comment.user.id && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => startEditing(comment)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteComment(comment.id)}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>

              {editingComment === comment.id ? (
                <div>
                  <Textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    rows={3}
                    className="mb-2"
                  />
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleEditComment(comment.id)}
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Salvar
                    </Button>
                    <Button
                      onClick={() => {
                        setEditingComment(null)
                        setEditContent("")
                      }}
                      variant="outline"
                      size="sm"
                      className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-700 text-sm whitespace-pre-wrap">{comment.content}</p>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">Nenhum comentário ainda.</p>
        )}
      </div>
    </div>
  )
}
