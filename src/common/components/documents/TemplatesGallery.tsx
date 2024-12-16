'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useCreateDocument } from '@/common/api/documents';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/common/components/ui/carousel';
import { templates } from '@/common/constants';
import { useWorkspaceId } from '@/common/hooks';
import { cn } from '@/common/utils';

const TemplatesGallery: React.FC = () => {
  const router = useRouter();
  const { mutate } = useCreateDocument();
  const [isCreating, setIsCreating] = useState(false);
  const workspaceId = useWorkspaceId();

  const onTemplateClick = (title: string, initialContent: string) => {
    setIsCreating(true);
    mutate(
      {
        form: {
          title,
          initialContent,
          workspaceId,
        },
      },
      {
        onSuccess: ({ data }) => {
          router.push(`/workspaces/${workspaceId}/documents/${data.$id}`);
        },
        onError: () => {
          setIsCreating(false);
        },
        onSettled: () => {
          setIsCreating(false);
        },
      }
    );
  };

  return (
    <div className="bg-[#F1F3F4]">
      <div className="mx-auto flex max-w-screen-xl flex-col gap-y-4 px-16 py-6">
        <h3 className="font-medium">使用一个新范本开始你的写作之旅</h3>
        <Carousel>
          <CarouselContent className="-ml-4">
            {templates.map((template) => (
              <CarouselItem
                key={template.id}
                className="basis-1/2 pl-4 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-[14.285714%]"
              >
                <div
                  className={cn(
                    'flex aspect-[3/4] flex-col gap-y-2.5',
                    isCreating && 'pointer-events-none opacity-50'
                  )}
                >
                  <button
                    disabled={isCreating}
                    onClick={() =>
                      onTemplateClick(template.label, template.initialContent)
                    }
                    style={{
                      backgroundImage: `url(${template.imageUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }}
                    className="flex size-full flex-col items-center justify-center gap-y-4 rounded-sm border bg-white transition hover:border-blue-500 hover:bg-blue-50"
                  />
                  <p className="truncate text-sm font-medium">
                    {template.label}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default TemplatesGallery;
