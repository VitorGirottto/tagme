"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface Post {
  id: number
  title: string
  content: string
}

interface EditPostFormProps {
  post: Post
  onPostUpdated: (post: any) => void
  onCancel: () => void
}

export function EditPostForm({ post, onPostUpdated, onCancel }: EditPostFormProps) {
  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return

    setLoading(true)
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`http://localhost:5000/api/posts/${post.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      })

      const data = await response.json()

      if (response.ok) {
        onPostUpdated(data.post)
      }
    } catch (error) {
      console.error("Erro ao editar post:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="edit-title">Título</Label>
        <Input id="edit-title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="edit-content">Conteúdo</Label>
        <Textarea id="edit-content" value={content} onChange={(e) => setContent(e.target.value)} rows={6} required />
      </div>

      <div className="flex space-x-2">
        <Button
          type="submit"
          disabled={loading || !title.trim() || !content.trim()}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {loading ? "Salvando..." : "Salvar"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
        >
          Cancelar
        </Button>
      </div>
    </form>
  )
}
