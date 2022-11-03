import { CollapseButton } from '@components/DMList/styles';
// import EachChannel from '@components/EachChannel';
import { IChannel, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import React, { FC, useCallback, useState } from 'react';
import { useLocation } from 'react-router';
import { useParams } from 'react-router';
import useSWR from 'swr';

const ChannelList: FC = () => {
    const { workspace } = useParams<{ workspace?: string }>();
    const location = useLocation();
    const { data: userData } = useSWR<IUser>('/api/users', fetcher, {
        dedupingInterval: 2000, // 2초
    });
    const { data: channelData } = useSWR<IChannel[]>(userData ? `/api/workspaces/${workspace}/channels` : null, fetcher);
    const [channelCollapse, setChannelCollapse] = useState(false);
	const [countList, setCountList] = useState<{[key:string]:number|undefined}>({});

    const toggleChannelCollapse = useCallback(() => {
        setChannelCollapse((prev) => !prev);
    }, []);

    const resetCount = useCallback(
		(id: any)=>{
			setCountList((list)=>{ return{...list,[id]:0,} })
		},[]
	)

    return (
        <>
        <h2>
            <CollapseButton collapse={channelCollapse} onClick={toggleChannelCollapse}>
            <i
                className="c-icon p-channel_sidebar__section_heading_expand p-channel_sidebar__section_heading_expand--show_more_feature c-icon--caret-right c-icon--inherit c-icon--inline"
                data-qa="channel-section-collapse"
                aria-hidden="true"
            />
            </CollapseButton>
            <span>Channels</span>
        </h2>
        {/* <div>
            {!channelCollapse &&
            channelData?.map((channel) => {
                return <EachChannel key={channel.id} channel={channel} />;
            })}
        </div> */}
        </>
    );
};

export default ChannelList;
