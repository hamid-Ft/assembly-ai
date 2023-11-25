import { StatusProps } from '../types/transcript';

const Status = ({ isLoading, status }: StatusProps) => {
    return (
        <div>
            <p>
                {isLoading
                    ? `Calculating...${status || 'uploading '}...`
                    : 'Give me audio!'}
            </p>
        </div>
    );
};

export default Status;
