import React from 'react';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { getRandomInterviewCover } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import DisplayTechicons from './DisplayTechicons';

// ✅ Type definition for props
type InterviewCardProps = {
  id: string;
  userId: string;
  role: string;
  type: string;
  techstack: string[];
  createdAt: string | number | Date;
};

const InterviewCard = ({
  id,
  userId,
  role,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) => {
  const feedback = null as Feedback | null;

  const normalizedType = /mix/gi.test(type) ? 'Mixed' : type;
  const formattedDate = dayjs(feedback?.createdAt || createdAt || Date.now()).format('MMM D, YYYY');

  return (
    <div className="card-border w-[360px] max-sm:w-full min-h-96">
      <div className="card-interview">
        <div>
          <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600">
            <p className="badge-text">{normalizedType}</p>
          </div>

          <Image
            src={getRandomInterviewCover()}
            alt="cover-image"
            width={90}
            height={90}
            className="rounded-full object-fit size-[90px]"
          />

          <h3 className="mt-5 capitalize">{role} Interview</h3>

          <div className="flex flex-row gap-5 mt-3">
            <div className="flex flex-row gap-2 items-center">
              <Image src="/calendar.svg" alt="calendar-icon" width={22} height={22} />
              <p>{formattedDate}</p>
            </div>

            <div className="flex flex-row gap-2 items-center">
              <Image src="/star.svg" alt="star-icon" width={22} height={22} />
              <p>{feedback?.totalScore ? `${feedback.totalScore}/100` : "---"}</p>
            </div>
          </div>

          <p className="line-clamp-2 mt-5">
            {feedback?.finalAssessment || "You haven't taken the interview yet. Take it now to improve your skills."}
          </p>

          <div className="flex flex-row justify-between items-center mt-4">
            <DisplayTechicons techStack={techstack} />
            <Button className="btn-primary">
              <Link href={feedback ? `/interview/${id}/feedback` : `/interview/${id}`}>
                {feedback ? 'Check Feedback' : 'View Interview'}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
