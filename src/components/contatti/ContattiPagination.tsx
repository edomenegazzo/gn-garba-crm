"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  currentPage: number;
  totalPages: number;
  total: number;
  pageSize: number;
};

export function ContattiPagination({ currentPage, totalPages, total, pageSize }: Props) {
  const searchParams = useSearchParams();

  function pageHref(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", String(page));
    }
    const qs = params.toString();
    return qs ? `/contatti?${qs}` : "/contatti";
  }

  const from = (currentPage - 1) * pageSize + 1;
  const to = Math.min(currentPage * pageSize, total);

  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  return (
    <div className="flex items-center justify-between flex-wrap gap-3">
      <div className="text-[11px] uppercase tracking-[0.15em] text-graymid">
        {from}–{to} di {total} · Pagina {currentPage} di {totalPages}
      </div>
      <div className="flex gap-2">
        {canPrev ? (
          <Link href={pageHref(currentPage - 1)} className="flex items-center gap-1 h-9 px-3 text-[12px] uppercase tracking-wider bg-white border-[1.5px] border-grayline hover:border-ink hover:bg-ink hover:text-cream transition-colors">
            <ChevronLeft size={14} /> Precedente
          </Link>
        ) : (
          <button disabled className="flex items-center gap-1 h-9 px-3 text-[12px] uppercase tracking-wider bg-cream-soft border-[1.5px] border-graylight text-graymid cursor-not-allowed">
            <ChevronLeft size={14} /> Precedente
          </button>
        )}
        {canNext ? (
          <Link href={pageHref(currentPage + 1)} className="flex items-center gap-1 h-9 px-3 text-[12px] uppercase tracking-wider bg-white border-[1.5px] border-grayline hover:border-ink hover:bg-ink hover:text-cream transition-colors">
            Successiva <ChevronRight size={14} />
          </Link>
        ) : (
          <button disabled className="flex items-center gap-1 h-9 px-3 text-[12px] uppercase tracking-wider bg-cream-soft border-[1.5px] border-graylight text-graymid cursor-not-allowed">
            Successiva <ChevronRight size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
