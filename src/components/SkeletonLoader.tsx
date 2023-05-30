export interface SkeletonLoaderProps {
    type?: 'Discogs' | 'Youtube';
}

export const SkeletonLoader = ({ type }: SkeletonLoaderProps) => {
    if (type === 'Discogs') {
        return (
            <div className="border border-slate-400 shadow rounded-md p-4 max-w-sm w-full mx-auto mb-4">
                <div className="animate-pulse flex flex-col items-center md:flex-row md:items-start space-y-4 md:space-x-4">
                    <div className="h-36 bg-slate-400 rounded w-full mx-auto" />
                    <div className="w-full space-y-4 py-1">
                        <div className="h-4 bg-slate-400 rounded w-3/4" />
                        <div className="space-y-2">
                            <div className="h-4 bg-slate-400 rounded" />
                            <div className="h-4 bg-slate-400 rounded w-5/6" />
                            <div className="h-4 bg-slate-400 rounded" />
                            <div className="h-4 bg-slate-400 rounded w-3/4" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (type === 'Youtube') {
        return (
            <div
                className="border border-slate-400 shadow rounded-md p-4
        max-w-sm w-full mx-auto mb-4"
            >
                <div className="animate-pulse flex space-x-4">
                    <div className="flex-1 space-y-4 py-1">
                        <div className="space-y-2">
                            <div className="h-52 bg-slate-400 rounded w-full mx-auto" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="border border-slate-400 shadow rounded-md p-4 max-w-sm w-full mx-auto mb-4">
            <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-4 py-1">
                    <div className="h-4 bg-slate-400 rounded w-3/4" />
                    <div className="space-y-2">
                        <div className="h-4 bg-slate-400 rounded" />
                        <div className="h-4 bg-slate-400 rounded w-5/6" />
                    </div>
                </div>
            </div>
        </div>
    );
};
