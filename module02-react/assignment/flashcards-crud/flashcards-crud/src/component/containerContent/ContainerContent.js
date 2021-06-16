import styles from './ContainerContent.module.css';
import { BiEdit } from 'react-icons/bi';
import { RiDeleteBin5Line } from 'react-icons/ri';

export default function ContainerContent({ children: flashCard, iconOnClickEdit, iconOnClickDelete }) {

    const { title, description } = flashCard;

    function handleIconOnClickEdit() {
        if (iconOnClickEdit) {
            iconOnClickEdit(flashCard);
        }
    }

    function handleIconOnClickDelete() {
        if (iconOnClickDelete) {
            iconOnClickDelete(flashCard.id);
        }
    }

    return (
        <div className={styles.contentContainer}>
            <h3>Title: {title}</h3>
            <p><strong>Description:</strong> {description}</p>
            <div className={styles.iconsContainer}>
                <BiEdit onClick={handleIconOnClickEdit} />

                <RiDeleteBin5Line onClick={handleIconOnClickDelete} />
            </div>
        </div>
    )
}
