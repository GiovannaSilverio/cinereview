import Star from "./Star";


export default function ModalAvaliar() {
    return(
        <div className="bg-gray rounded-md ">
            <span>X</span>
            <div>
                <div></div>
                <div>
                    <h3>O que você achou desse filme?</h3>
                    <Star isActive/>
                </div>
            </div>
        </div>
    );
};
