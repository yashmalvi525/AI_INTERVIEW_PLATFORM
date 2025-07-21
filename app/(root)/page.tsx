// 'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import InterviewCard from '@/app/components/InterviewCard';
import { getCurrentUser } from '@/actions/auth.action';
import { getInterviewsByUserId, getLatestInterviews } from '@/actions/general.action';

const Page = async () => {
  const user = await getCurrentUser();

  const [rawUserInterviews, rawLatestInterviews] = await Promise.all([
    getInterviewsByUserId(user?.id!), // ✅ fixed function name
    getLatestInterviews({ userId: user?.id! }),
  ]);

  const userInterviews = rawUserInterviews || [];
  const latestInterviews = rawLatestInterviews || [];

  const hasPastInterviews = userInterviews.length > 0;
  const hasUpcomingInterviews = latestInterviews.length > 0;

  return (
    <>
      {/* CTA Section */}
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
          <p className="text-lg">
            Practice on real interview questions & get instant feedback.
          </p>
          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>
        <Image
          src="/robot.png"
          alt="robot-dude"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>

      {/* Past Interviews Section */}
      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Past Interviews</h2>
        <div className="interviews-section">
          {hasPastInterviews ? (
            userInterviews.map((interview) => (
              <InterviewCard key={interview.id} {...interview} />
            ))
          ) : (
            <p>You haven't taken any interviews yet.</p>
          )}
        </div>
      </section>

      {/* Available New Interviews Section */}
      <section className="flex flex-col gap-6 mt-8">
        <h2>Available Interviews</h2>
        <div className="interviews-section">
          {hasUpcomingInterviews ? (
            latestInterviews.map((interview) => (
              <InterviewCard key={interview.id} {...interview} />
            ))
          ) : (
            <p>There are no new interviews available at the moment.</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Page;
