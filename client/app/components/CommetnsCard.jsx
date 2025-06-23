import Image from "next/image";
import React from "react";

const CommetnsCard = ({ article, handleDelete, user, setInputs, setMode }) => {
  const setTitle = (id, title) => {
    setInputs({
      id,
      title,
      postsId: article?.id,
      usersId: user?.SenTokn?.id,
    });
    setMode(true);
  };
  const comments = article?.comments;

  return (
    <div className="w-full max-h-60 overflow-y-scroll scroll-arrow bg-white dark:bg-articleGray-800 rounded-lg border border-articleGray-200 dark:border-articleGray-700 shadow-md p-2">
      {article?.comments?.map((comment) => {
        if (!comment) return null;
        const ownerComment = article?.User?.id === user?.SenTokn?.id;
        return (
          <div
            className="flex justify-between items-center px-4 overflow-hidden mb-4 py-3 bg-articleGray-100 dark:bg-articleGray-700 rounded-md"
            key={comment?.id}
          >
            <div className="flex gap-2 items-center mb-2">
              <Image
                src={comment?.user?.img || "/avatar-user.png"}
                alt={`${comment?.user?.name || "Anonymous"}'s avatar`}
                width={100}
                height={100}
                className="w-14 h-14 rounded-full"
              />
              <div className="">
                <h3 className="text-lg font-bold capitalize text-articleGray-800 dark:text-white">
                  {comment?.user?.name || "Anonymous"}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {comment?.title || "No comment"}
                </p>
              </div>
            </div>
            {ownerComment && (
              <div className="flex gap-2 items-center">
                <Image
                  onClick={() => handleDelete(comment?.id)}
                  src="/delete.png"
                  alt="Delete comment"
                  width={24}
                  height={24}
                  className="cursor-pointer"
                />
                <Image
                  onClick={() => setTitle(comment?.id, comment?.title)}
                  src="/edit.png"
                  alt="Edit comment"
                  width={24}
                  height={24}
                  className="cursor-pointer"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CommetnsCard;
