
import React from 'react';
import { Filter, Calendar, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CommentFiltersProps {
  filter: string;
  setFilter: (value: string) => void;
  sortOrder: string;
  setSortOrder: (value: string) => void;
  commentCount: number;
}

const CommentFilters: React.FC<CommentFiltersProps> = ({
  filter,
  setFilter,
  sortOrder,
  setSortOrder,
  commentCount
}) => {
  return (
    <div className="mb-6 flex flex-wrap gap-3 items-center">
      <div className="flex items-center gap-2">
        <Filter size={16} className="text-white/70" />
        <span className="text-white/70 text-sm">Filter:</span>
      </div>
      
      <Select value={filter} onValueChange={setFilter}>
        <SelectTrigger className="w-[150px] bg-slate-800 border-slate-700">
          <SelectValue placeholder="Filter comments" />
        </SelectTrigger>
        <SelectContent className="bg-slate-800 border-slate-700">
          <SelectItem value="all">All comments</SelectItem>
          <SelectItem value="withCompany">With company</SelectItem>
          <SelectItem value="withWebsite">With website</SelectItem>
        </SelectContent>
      </Select>
      
      <div className="ml-auto flex items-center gap-2">
        <Calendar size={16} className="text-white/70" />
        <span className="text-white/70 text-sm">Sort:</span>
      </div>
      
      <Select value={sortOrder} onValueChange={setSortOrder}>
        <SelectTrigger className="w-[150px] bg-slate-800 border-slate-700">
          <SelectValue placeholder="Sort order" />
        </SelectTrigger>
        <SelectContent className="bg-slate-800 border-slate-700">
          <SelectItem value="newest">Newest first</SelectItem>
          <SelectItem value="oldest">Oldest first</SelectItem>
          <SelectItem value="mostLiked">Most liked</SelectItem>
        </SelectContent>
      </Select>
      
      <div className="flex gap-2 items-center">
        <Badge variant="outline" className="bg-slate-800">
          <Eye size={12} className="mr-1" />
          {commentCount} comments
        </Badge>
      </div>
    </div>
  );
};

export default CommentFilters;
