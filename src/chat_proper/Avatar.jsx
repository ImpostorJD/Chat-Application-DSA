/* eslint-disable react/prop-types */
export default function Avatar({name}) {

    // eslint-disable-next-line react/prop-types
    const initials = () => {
        return name.split(' ')
        .map(word => word[0].toUpperCase())
        .join('');
    } 
    const colors = ['#ff5733', '#33ff57', '#5733ff', '#ff33c2'];

    const getRandomColor = () => {
          const randomIndex = Math.floor(Math.random() * colors.length);
          return colors[randomIndex];
    };

    return(
        <div className="text-slate-300 rounded-full p-3 h-[50px] w-[50px] text-center" style={{backgroundColor: getRandomColor()}}>
            <p className="text-white font-bold">
                {initials()}
            </p>
        </div>
    );
}