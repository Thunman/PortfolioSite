import {
	LevelSelectorBackdrop,
	StyledUserSeletorModal,
	UserNameCard,
	UserNameCardForModal,
} from "../Styles/Styles";
import { UserSelectorModalProps } from "../Interfaces/Interfaces";
import { useEffect, useState } from "react";
import { getAllUserNames } from "../Services/Getters";
import { initMsgDB } from "../Services/Setters";

const UserSelectorModal = ({
	handleClose,
	handleSelect,
}: UserSelectorModalProps) => {
	const [users, setUsers] = useState<string[]>([]);
	useEffect(() => {
		const importUsers = async () => {
			const usersFromDB = await getAllUserNames();
			if (!usersFromDB) return;
			setUsers(usersFromDB);
		};
		importUsers();
	}, []);
	const dropIn = {
		hidden: {
			y: "-100vh",
			opacity: 0,
		},
		visible: {
			y: "0",
			opacity: 1,
			transition: {
				duration: 0.1,
				type: "spring",
				damping: 25,
				stiffnes: 500,
			},
		},
		exit: {
			y: "100vh",
			opacity: 0,
		},
	};

	return (
		<LevelSelectorBackdrop onClick={handleClose}>
			<StyledUserSeletorModal
				onClick={(e) => e.stopPropagation()}
				variants={dropIn}
				initial="hidden"
				animate="visible"
				exit="exit"
			>
				{users.map((name, index) => (
					<UserNameCardForModal key={index} id={name} onClick={() => {
                        handleSelect(name)
                    }}>
						<p>{name}</p>
					</UserNameCardForModal>
				))}
			</StyledUserSeletorModal>
		</LevelSelectorBackdrop>
	);
};
export default UserSelectorModal;
