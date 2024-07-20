import React from 'react';
    import { Issue } from '../types';
    interface IssueListProps {
    issues: Issue[];
    }
    export const IssueList: React.FC<IssueListProps> = ({ issues }) => {
    return (
    <ul>
    {issues.map((issue) => (
    <li key={issue.id}>{issue.title}</li>
    ))}
    </ul>
    );
    };
