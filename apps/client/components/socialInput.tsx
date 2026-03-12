import { SocialInputProps, SocialLink } from "../interfaces/socialInput";
import { useState } from "react";
import { cn } from "../utility/cn";
import { Plus, X } from "lucide-react";


export function SocialInput({
  platform,
  icon: Icon,
  label,
  placeholder,
  existingLink,
  onAdd,
  onRemove,
}: SocialInputProps) {
  const [url, setUrl] = useState(existingLink?.url || "");
  const [isEditing, setIsEditing] = useState(!existingLink);

  const handleAdd = () => {
    if (url.trim()) {
      onAdd(url);
      setIsEditing(false);
    }
  };

  const handleRemove = () => {
    if (existingLink) {
      onRemove(existingLink.id);
      setUrl("");
      setIsEditing(true);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <Icon className="w-5 h-5 text-neutral-400 shrink-0" />
      <span className="text-sm text-neutral-300 min-w-24 shrink-0">
        {label}
      </span>

      {existingLink && !isEditing ? (
        <div className="flex-1 flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700">
          <span className="flex-1 text-sm text-neutral-300 truncate">
            {existingLink.url}
          </span>
          <button
            onClick={handleRemove}
            className="p-1 hover:bg-neutral-700 rounded transition-colors"
          >
            <X className="w-4 h-4 text-neutral-500 hover:text-red-500" />
          </button>
        </div>
      ) : (
        <>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={placeholder}
            className="flex-1 px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 focus:border-neutral-50 focus:outline-none transition-colors text-sm"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAdd();
              }
            }}
          />
          <button
            onClick={handleAdd}
            disabled={!url.trim()}
            className="px-3 py-2 rounded-lg bg-mint hover:bg-mint disabled:bg-neutral-700 disabled:cursor-not-allowed transition-colors shrink-0"
          >
            <Plus className={cn("w-4 h-4 ", url ? "text-neutral-800":"")} />
          </button>
        </>
      )}
    </div>
  );
}