export const allowedFileExtensions = ["png", "jpg", "jpeg"];
export const responseStatus = {
    success: "Success",
    error: "Error"
}
export const responseMessages = {
    ok: "OK",
    post: (item) => {return `${item} saved succesfully`},
    put: (item) => {return `${item} updated succesfully`},
    delete: (item) => {return `${item} deleted succesfully`},
    uploadFile: "No files to upload",
    extensionNotAllowed: (extension) => {return `File extension ${extension.toUpperCase()} not allowed`}
}