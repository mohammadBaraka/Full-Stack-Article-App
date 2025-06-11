import Image from "next/image";
import React from "react";

const CommetnsCard = ({
  article,
  handleDelete,
  user,
  setInputs,
  inputs,
  setMode,
}) => {
  const setTitle = (id, title) => {
    setInputs({
      id,
      title,
      postsId: article?.id,
      usersId: user?.SenTokn?.id,
    });
    setMode(true);
  };

  return (
    <div className="w-full max-h-60 overflow-y-scroll scroll-arrow bg-white dark:bg-articleGray-800 rounded-lg border border-articleGray-200 dark:border-articleGray-700 shadow-md p-2">
      {article?.comments.map((comment) => {
        const ownerComment = comment?.usersId === user?.SenTokn?.id;

        return (
          <div
            className="flex justify-between items-center px-4 overflow-hidden mb-4 py-3 bg-articleGray-100 dark:bg-articleGray-700 rounded-md"
            key={comment?.id}
          >
            <div className="flex gap-2 items-center mb-2">
              <Image
                src={comment?.user?.img}
                alt=""
                width={100}
                height={100}
                className="w-14 h-14 rounded-full "
              />
              <div className="">
                <h3 className="text-lg font-bold capitalize text-articleGray-800 dark:text-white">
                  {comment?.user?.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{comment?.title}</p>
              </div>
            </div>
            {ownerComment && (
              <div className="flex gap-2 items-center">
                <Image
                  onClick={() => handleDelete(comment?.id)}
                  src={"/delete.png"}
                  alt="delete"
                  width={100}
                  height={100}
                  className="w-6 h-6 rounded-full cursor-pointer"
                />
                <Image
                  onClick={() => setTitle(comment?.id, comment?.title)}
                  src={"/edit.png"}
                  alt="delete"
                  width={100}
                  height={100}
                  className="w-6 h-6  cursor-pointer"
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
