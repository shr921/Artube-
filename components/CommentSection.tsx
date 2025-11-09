import React, { useState } from 'react';
import { Comment, User } from '../types';
import { Icon } from './Icons';

interface CommentSectionProps {
  initialComments: Comment[];
  currentUser: User | null;
}

const CommentCard: React.FC<{ comment: Comment }> = ({ comment }) => (
    <div className="flex items-start space-x-3 mb-4">
        <img src={comment.user.avatarUrl} alt={comment.user.name} className="w-10 h-10 rounded-full"/>
        <div>
            <p className="text-sm font-semibold">{comment.user.name}</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">{comment.text}</p>
            <div className="flex items-center space-x-3 mt-1 text-gray-500 dark:text-gray-400 text-xs">
                <button className="flex items-center hover:text-gray-900 dark:hover:text-gray-100"><Icon name="like" className="w-4 h-4 mr-1"/> {comment.likes}</button>
            </div>
        </div>
    </div>
);

const CommentForm: React.FC<{ currentUser: User | null; onSubmit: (text: string) => void }> = ({ currentUser, onSubmit }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim() && currentUser) {
            onSubmit(text);
            setText('');
        }
    };

    if (!currentUser) {
        return (
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center text-sm text-gray-600 dark:text-gray-400">
                Please sign in to comment.
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex items-start space-x-3">
            <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-10 h-10 rounded-full"/>
            <div className="flex-grow">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                    rows={2}
                />
                <div className="text-right mt-2">
                    <button type="submit" className="bg-pink-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-pink-700 transition disabled:bg-pink-400" disabled={!text.trim()}>
                        Comment
                    </button>
                </div>
            </div>
        </form>
    )
}

export const CommentSection: React.FC<CommentSectionProps> = ({ initialComments, currentUser }) => {
    const [comments, setComments] = useState<Comment[]>(initialComments);

    const handleCommentSubmit = (text: string) => {
        if (currentUser) {
            const newComment: Comment = {
                user: currentUser,
                text,
                likes: 0
            };
            setComments(prev => [newComment, ...prev]);
        }
    };

    return (
        <>
            <h2 className="text-xl font-bold mb-4 flex-shrink-0">{comments.length} Comments</h2>
            <div className="overflow-y-auto flex-grow pr-2 mb-4">
                <CommentForm currentUser={currentUser} onSubmit={handleCommentSubmit} />
                <div className="mt-6">
                    {comments.map((comment, index) => <CommentCard key={index} comment={comment}/>)}
                </div>
            </div>
        </>
    );
};