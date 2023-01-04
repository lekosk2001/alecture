// import EachDM from '@components/EachDM';
// import useSocket from '@hooks/useSocket';
import { CollapseButton } from '@components/DMList/styles';
import { IChannel, IDM, IUser, IUserWithOnline } from '@typings/db';
import fetcher from '@utils/fetcher';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import useSWR from 'swr';

const DMList:FC = () => {
	const { workspace } = useParams<{ workspace?: string }>();
	const { data: userData } = useSWR<IUser>('/api/users', fetcher, {
		dedupingInterval: 2000, // 2초
	});
	const { data: memberData } = useSWR<IUserWithOnline[]>(
		userData ? `/api/workspaces/${workspace}/members` : null,
		fetcher,
	);
	// const [socket] = useSocket(workspace);
	const [channelCollapse, setChannelCollapse] = useState(false);
	const [countList, setCountList] = useState<{[key:string]:number|undefined}>({});
	const [onlineList, setOnlineList] = useState<number[]>([]);

	const toggleChannelCollapse = useCallback(() => {
		setChannelCollapse((prev) => !prev);
	}, []);

	const resetCount = useCallback(
		(id: any)=>{
			setCountList((list)=>{ return{...list,[id]:0,} })
		},[]
	)

	useEffect(() => {
		console.log('DMList: workspace 바꼈다', workspace);
		setOnlineList([]);
	}, [workspace]);

	// useEffect(() => {
	//   socket?.on('onlineList', (data: number[]) => {
	//     setOnlineList(data);
	//   });
	//   console.log('socket on dm', socket?.hasListeners('dm'), socket);
	//   return () => {
	//     console.log('socket off dm', socket?.hasListeners('dm'));
	//     socket?.off('onlineList');
	//   };
	// }, [socket]);

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
				<span>Direct Messages</span>
			</h2>
			<div>
				{!channelCollapse &&
					memberData?.map((member) => {
						const isOnline = onlineList.includes(member.id);
						const count = countList[member.id] || 0;
						return (

						<NavLink
							key={member.id}
							className={ ({ isActive }) =>  isActive? "selected" : ""  } // 액티브시 클래스네임 변경
							to={`/workspace/${workspace}/dm/${member.id}`}
							// onClick={resetCount(member.id)}
						>
							<i
								className={`c-icon p-channel_sidebar__presence_icon p-channel_sidebar__presence_icon--dim_enabled c-presence ${
								isOnline ? 'c-presence--active c-icon--presence-online' : 'c-icon--presence-offline'
								}`}
								aria-hidden="true"
								data-qa="presence_indicator"
								data-qa-presence-self="false"
								data-qa-presence-active="false"
								data-qa-presence-dnd="false"
							/>
							<span className={ count>0 ?'bold':undefined}>{member.nickname}</span>
							{member.id===userData?.id&&<span>(나)</span>}
						</NavLink>
						)})}
			</div>
		</>
	);
};

export default DMList;
