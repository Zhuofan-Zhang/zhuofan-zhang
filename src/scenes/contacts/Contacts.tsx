import {useForm} from "react-hook-form";
import {SelectedPage} from "@/shared/types";
import {motion} from "framer-motion";
import HText from "@/shared/HText";
import { notification} from "antd";
import { SmileOutlined } from '@ant-design/icons';
import {sendEmail} from "@/shared/sendEmail";

type Props = {
    setSelectedPage: (value: SelectedPage) => void;
};

const ContactUs = ({setSelectedPage}: Props) => {
    const inputStyles = `mb-5 w-full rounded-lg bg-yellow-100 px-5 py-3 placeholder-black text-black`;
    const errorStyles = `mt-1 text-red-100 pb-1`;

    const {
        register,
        trigger,
        formState: {errors},
        reset
    } = useForm();

    const onSubmit = async (e: any) => {
        const isValid = await trigger();
        e.preventDefault();
        if (isValid) {
            console.log(isValid);
            openNotification();
            sendEmail();
            reset();
        }
    };

    const openNotification = () => {
        notification.open({
            message: 'Hi There,',
            description: 'You have sent an email to Zhuofan\'s inbox. You will get a response in 24 hours.',
            icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        });
    };



    return (
        <section id="contacts" className="mx-auto w-5/6 bg-primary-100 pt-24 pb-32">
            <motion.div
                onViewportEnter={() => setSelectedPage(SelectedPage.Contacts)}
            >
                {/* HEADER */}
                <motion.div
                    className="md:w-3/5"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{once: true, amount: 0.5}}
                    transition={{duration: 0.5}}
                    variants={{
                        hidden: {opacity: 0, x: -50},
                        visible: {opacity: 1, x: 0},
                    }}
                >
                    <HText>
                        <span className="text-primary-500">Contact me</span>
                    </HText>
                    <p className="my-5 text-xl">
                        If you are hiring or needing help to build your software, please do not hesitate to reach out.
                    </p>
                </motion.div>

                {/* FORM AND IMAGE */}
                <div className="mt-10 justify-between gap-8 md:flex">
                    <motion.div
                        className="mt-10 basis-3/5 md:mt-0"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{once: true, amount: 0.5}}
                        transition={{duration: 0.5}}
                        variants={{
                            hidden: {opacity: 0, y: 50},
                            visible: {opacity: 1, y: 0},
                        }}
                    >
                        <form id="contact-form" onSubmit={onSubmit}>
                            {errors.name && (
                                <p className={errorStyles}>
                                    {errors.name.type === "required" &&
                                    "This field is required."}
                                    {errors.name.type === "maxLength" &&
                                    "Max length is 2000 char."}
                                </p>
                            )}
                            <input
                                className={inputStyles}
                                type="text"
                                placeholder="NAME"
                                {...register("name", {
                                    required: true,
                                    maxLength: 500,
                                })}
                            />
                            {errors.email && (
                                <p className={errorStyles}>
                                    {errors.email.type === "required" && "This field is required."}
                                    {errors.email.type === "maxLength" &&
                                    "Max length is 500 char."}
                                </p>
                            )}
                            <input
                                className={inputStyles}
                                type="text"
                                placeholder="EMAIL"
                                {...register("email", {
                                    required: true,
                                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                })}
                            />
                            {errors.message && (
                                <p className={errorStyles}>
                                    {errors.message.type === "required" &&
                                    "This field is required."}
                                    {errors.message.type === "pattern" && "Invalid email address."}
                                </p>
                            )}
                            <textarea
                                className={inputStyles}
                                placeholder="MESSAGE"
                                rows={4}
                                cols={50}
                                {...register("message", {
                                    required: true,
                                    maxLength: 2000,
                                })}
                            />

                            <button
                                type="submit"
                                onClick={onSubmit}
                                className="mt-5 rounded-lg bg-secondary-500 px-20 py-3 transition duration-500 hover:text-white"
                            >
                                SUBMIT
                            </button>
                        </form>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default ContactUs;
