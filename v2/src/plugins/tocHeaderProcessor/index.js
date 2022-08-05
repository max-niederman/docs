module.exports = () => {
    return (data, file) => {
        if (data.children.length) {
            let isInPreBuiltContent = false;
            let isInCustomUIContent = false;

            data.children = data.children.map(child => {
                if (child.value === "<PreBuiltUIContent>") {
                    isInPreBuiltContent = true;
                } else if (child.value === "</PreBuiltUIContent>") {
                    isInPreBuiltContent = false;
                } else if (child.value === "<CustomUIContent>") {
                    isInCustomUIContent = true;
                } else if (child.value === "</CustomUIContent>") {
                    isInCustomUIContent = false;
                } else if (child.type === "heading") {
                    if (isInPreBuiltContent || isInCustomUIContent) {
                        let valuePostFix = isInPreBuiltContent ? " [[prebuilt]]" : " [[custom]]";

                        child.children = child.children.map(headingChild => {
                            if (headingChild.type === "text") {
                                const id = headingChild.value.toLowerCase().split(" ").join("-").trim();
                                headingChild.value = headingChild.value + valuePostFix + ` {#${id}}`;
                            }

                            return headingChild;
                        })
                    }
                }

                return child;
            })
        }

        // Returning nothing is the equivalent of returning the default data, this is just a precaution
        return data;
    }
}