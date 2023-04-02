"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
/* eslint-disable @next/next/no-img-element */
var head_1 = require("next/head");
var Home_module_css_1 = require("../styles/Home.module.css");
var react_1 = require("react");
var web3_storage_1 = require("web3.storage");
var react_modal_1 = require("react-modal");
var ethers_1 = require("ethers");
var link_1 = require("next/link");
var axios_1 = require("axios");
var react_dropzone_1 = require("react-dropzone");
//ABIs
var postABI_json_1 = require("../utils/postABI.json");
var postManagerABI_json_1 = require("../utils/postManagerABI.json");
function Home() {
    var postManagerContract = "0xb8EEFA0F443968aEa5e4929f70c5304B014EF70F"; //postManager smart contract address
    //variables
    var _a = react_1.useState(""), token = _a[0], setToken = _a[1];
    var _b = react_1.useState(""), postTitle = _b[0], setPostTitle = _b[1];
    var _c = react_1.useState(""), postContent = _c[0], setPostContent = _c[1];
    var _d = react_1.useState(false), isLoading = _d[0], setIsLoading = _d[1];
    var _e = react_1.useState("Loading..."), loadedData = _e[0], setLoadedData = _e[1];
    var _f = react_1.useState(""), currentWalletAddress = _f[0], setCurrentWalletAddress = _f[1];
    var _g = react_1.useState([]), allPosts = _g[0], setAllPosts = _g[1];
    var _h = react_1.useState(0), noOfPosts = _h[0], setNoOfPosts = _h[1];
    var _j = react_1.useState(null), activePost = _j[0], setPostToActive = _j[1];
    var _k = react_1.useState(""), latestCid = _k[0], setLatestCid = _k[1];
    var _l = react_1.useState(""), commentText = _l[0], setCommentText = _l[1];
    var _m = react_1.useState(null), file = _m[0], setFile = _m[1];
    var _o = react_1.useState(""), filename = _o[0], setFilename = _o[1];
    var _p = react_1.useState(""), fileDetails = _p[0], setFileDetails = _p[1];
    var _q = react_1.useState(""), imageUrl = _q[0], setImageUrl = _q[1];
    function openModal() {
        setIsLoading(true);
    }
    function closeModal() {
        setIsLoading(false);
    }
    function getAllPosts() {
        return __awaiter(this, void 0, void 0, function () {
            var ethereum, accounts, walletAddr, provider, signer, postManagerContractInstance, allPostsAddresses, allPosts_1, new_posts, _loop_1, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ethereum = window.ethereum;
                        // Check if MetaMask is installed
                        if (!ethereum) {
                            return [2 /*return*/, "Make sure you have MetaMask Connected!"];
                        }
                        return [4 /*yield*/, ethereum.request({
                                method: "eth_requestAccounts"
                            })];
                    case 1:
                        accounts = _a.sent();
                        walletAddr = accounts[0];
                        //set to variable to store current wallet address
                        setCurrentWalletAddress(walletAddr);
                        if (!ethereum) return [3 /*break*/, 8];
                        provider = new ethers_1.ethers.providers.Web3Provider(ethereum);
                        signer = provider.getSigner();
                        postManagerContractInstance = new ethers_1.ethers.Contract(postManagerContract, postManagerABI_json_1["default"], signer);
                        return [4 /*yield*/, postManagerContractInstance.getPosts()];
                    case 2:
                        allPostsAddresses = _a.sent();
                        return [4 /*yield*/, postManagerContractInstance.getPostsData(allPostsAddresses)];
                    case 3:
                        allPosts_1 = _a.sent();
                        //(3) set latest cid using react set variable
                        setLatestCid(allPosts_1.postCID);
                        new_posts = [];
                        _loop_1 = function (i) {
                            var posterWalletAddress, noOfComments, postSCAddress, postid, config, axiosResponse, postDataObject, getCurrentPostTitle, getCurrentPostContent, newPost;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        posterWalletAddress = allPosts_1.posterAddress[i];
                                        noOfComments = allPosts_1.numberOfComments[i].toNumber();
                                        postSCAddress = allPostsAddresses[i];
                                        return [4 /*yield*/, postManagerContractInstance.postIDs(postSCAddress)];
                                    case 1:
                                        postid = _a.sent();
                                        if (!(allPosts_1.postCID !== 0)) return [3 /*break*/, 3];
                                        config = {
                                            method: "get",
                                            url: "https://" + allPosts_1.postCID + ".ipfs.w3s.link/post.json",
                                            headers: {}
                                        };
                                        return [4 /*yield*/, axios_1["default"](config)];
                                    case 2:
                                        axiosResponse = _a.sent();
                                        postDataObject = axiosResponse.data;
                                        getCurrentPostTitle = postDataObject.filter(function (data) { return data.post_ID === postid.toNumber(); })[0].post_title;
                                        getCurrentPostContent = postDataObject.filter(function (data) { return data.post_ID === postid.toNumber(); })[0].post_content;
                                        newPost = {
                                            postTitle: getCurrentPostTitle,
                                            postContent: getCurrentPostContent,
                                            postId: postid.toNumber(),
                                            posterWalletAddress: posterWalletAddress,
                                            noOfComments: noOfComments,
                                            postSCAddress: postSCAddress,
                                            comments: [],
                                            imageCID: "",
                                            imageFilename: ""
                                        };
                                        new_posts.push(newPost);
                                        _a.label = 3;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        };
                        i = 0;
                        _a.label = 4;
                    case 4:
                        if (!(i < allPosts_1.posterAddress.length)) return [3 /*break*/, 7];
                        return [5 /*yield**/, _loop_1(i)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        i++;
                        return [3 /*break*/, 4];
                    case 7:
                        setAllPosts(new_posts);
                        setNoOfPosts(allPosts_1.posterAddress.length);
                        _a.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    }
    function createPost() {
        return __awaiter(this, void 0, void 0, function () {
            var storage, postObj, buffer, files, cid, imageFile, imageCid, ethereum, provider, signer, postManagerContractInstance, hash, config, axiosResponse, postDataObject, postObj, buffer, newfile, cid, imageFile, imageCid, ethereum, provider, signer, postManagerContractInstance, hash, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 16, , 17]);
                        //check required fields
                        if (!postTitle || !postContent) {
                            return [2 /*return*/, alert("Fill all the fields!!")];
                        }
                        //check if user has uploaded a file
                        if (file == null) {
                            return [2 /*return*/, alert("Please upload a image file before proceeding.")];
                        }
                        setLoadedData("Creating post ...Please wait");
                        openModal();
                        storage = new web3_storage_1.Web3Storage({ token: token });
                        if (!(noOfPosts === 0)) return [3 /*break*/, 7];
                        postObj = [
                            {
                                post_ID: noOfPosts,
                                post_title: postTitle,
                                post_content: postContent,
                                poster_address: currentWalletAddress,
                                comments: []
                            },
                        ];
                        buffer = Buffer.from(JSON.stringify(postObj));
                        files = [new web3_storage_1.File([buffer], "post.json")];
                        return [4 /*yield*/, storage.put(files)];
                    case 1:
                        cid = _a.sent();
                        setLatestCid(cid);
                        imageFile = [new web3_storage_1.File([file], filename)];
                        return [4 /*yield*/, storage.put(imageFile)];
                    case 2:
                        imageCid = _a.sent();
                        closeModal();
                        ethereum = window.ethereum;
                        if (!ethereum) return [3 /*break*/, 5];
                        //set loading modal to open and loading modal text
                        setLoadedData("Creating Post...Please wait");
                        openModal();
                        provider = new ethers_1.ethers.providers.Web3Provider(ethereum);
                        signer = provider.getSigner();
                        postManagerContractInstance = new ethers_1.ethers.Contract(postManagerContract, postManagerABI_json_1["default"], signer);
                        return [4 /*yield*/, postManagerContractInstance.createPost(cid, imageCid, filename, {
                                gasLimit: 1200000
                            })];
                    case 3:
                        hash = (_a.sent()).hash;
                        // (6) wait for transaction to be mined
                        return [4 /*yield*/, provider.waitForTransaction(hash)];
                    case 4:
                        // (6) wait for transaction to be mined
                        _a.sent();
                        // (7) display alert message
                        alert("Transaction sent! Hash: " + hash);
                        _a.label = 5;
                    case 5: 
                    //call getAllPosts function to refresh the current list of post
                    return [4 /*yield*/, getAllPosts()];
                    case 6:
                        //call getAllPosts function to refresh the current list of post
                        _a.sent();
                        //reset fields back to default values
                        setPostTitle("");
                        setPostContent("");
                        setFile(null);
                        setFileDetails("");
                        setFilename("");
                        //close modal
                        closeModal();
                        return [3 /*break*/, 15];
                    case 7:
                        config = {
                            method: "get",
                            url: "https://" + latestCid + ".ipfs.w3s.link/post.json",
                            headers: {}
                        };
                        return [4 /*yield*/, axios_1["default"](config)];
                    case 8:
                        axiosResponse = _a.sent();
                        postDataObject = axiosResponse.data;
                        postObj = {
                            post_ID: noOfPosts,
                            post_title: postTitle,
                            post_content: postContent,
                            poster_address: currentWalletAddress,
                            comments: []
                        };
                        postDataObject.push(postObj);
                        buffer = Buffer.from(JSON.stringify(postDataObject));
                        newfile = [new web3_storage_1.File([buffer], "post.json")];
                        return [4 /*yield*/, storage.put(newfile)];
                    case 9:
                        cid = _a.sent();
                        imageFile = [new web3_storage_1.File([file], filename)];
                        return [4 /*yield*/, storage.put(imageFile)];
                    case 10:
                        imageCid = _a.sent();
                        setLatestCid(cid);
                        closeModal();
                        ethereum = window.ethereum;
                        if (!ethereum) return [3 /*break*/, 13];
                        //set loading modal to open and loading modal text
                        setLoadedData("Creating Post...Please wait");
                        openModal();
                        provider = new ethers_1.ethers.providers.Web3Provider(ethereum);
                        signer = provider.getSigner();
                        postManagerContractInstance = new ethers_1.ethers.Contract(postManagerContract, postManagerABI_json_1["default"], signer);
                        return [4 /*yield*/, postManagerContractInstance.createPost(cid, imageCid, filename, {
                                gasLimit: 1200000
                            })];
                    case 11:
                        hash = (_a.sent()).hash;
                        //wait for transaction to be mined
                        return [4 /*yield*/, provider.waitForTransaction(hash)];
                    case 12:
                        //wait for transaction to be mined
                        _a.sent();
                        //display alert message
                        alert("Transaction sent! Hash: " + hash);
                        _a.label = 13;
                    case 13: 
                    //call getAllPosts to refresh the current list
                    return [4 /*yield*/, getAllPosts()];
                    case 14:
                        //call getAllPosts to refresh the current list
                        _a.sent();
                        //reset fields back to default values
                        setPostTitle("");
                        setPostContent("");
                        setFile(null);
                        setFileDetails("");
                        setFilename("");
                        //close modal
                        closeModal();
                        _a.label = 15;
                    case 15: return [3 /*break*/, 17];
                    case 16:
                        error_1 = _a.sent();
                        console.log(error_1);
                        closeModal();
                        alert("Error: " + error_1);
                        return [2 /*return*/, "" + error_1];
                    case 17: return [2 /*return*/];
                }
            });
        });
    }
    function postComment(postData) {
        return __awaiter(this, void 0, void 0, function () {
            var storage, config, axiosResponse, postDataObject, otherPostData, getCurrentPostData, userComment, buffer, newfile, newCid, ethereum, provider, signer, postManagerContractInstance, hash, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        if (!commentText) {
                            return [2 /*return*/, alert("Fill all the fields required!!")];
                        }
                        setLoadedData("Storing comment ...Please wait");
                        openModal();
                        storage = new web3_storage_1.Web3Storage({ token: token });
                        config = {
                            method: "get",
                            url: "https://" + latestCid + ".ipfs.w3s.link/post.json",
                            headers: {}
                        };
                        return [4 /*yield*/, axios_1["default"](config)];
                    case 1:
                        axiosResponse = _a.sent();
                        postDataObject = axiosResponse.data;
                        otherPostData = postDataObject.filter(function (data) { return data.post_ID !== postData.postId; });
                        getCurrentPostData = postDataObject.filter(function (data) { return data.post_ID === postData.postId; })[0];
                        userComment = {
                            comment_address: currentWalletAddress,
                            comment_content: commentText
                        };
                        //add new comment into comment array
                        getCurrentPostData.comments.push(userComment);
                        //add back current post data back into rest of the post data
                        otherPostData.push(getCurrentPostData);
                        buffer = Buffer.from(JSON.stringify(otherPostData));
                        newfile = [new web3_storage_1.File([buffer], "post.json")];
                        return [4 /*yield*/, storage.put(newfile)];
                    case 2:
                        newCid = _a.sent();
                        setLatestCid(newCid);
                        closeModal();
                        ethereum = window.ethereum;
                        if (!ethereum) return [3 /*break*/, 7];
                        //set loading modal to open and loading modal text
                        setLoadedData("submitting comment...Please wait");
                        openModal();
                        provider = new ethers_1.ethers.providers.Web3Provider(ethereum);
                        signer = provider.getSigner();
                        postManagerContractInstance = new ethers_1.ethers.Contract(postManagerContract, postManagerABI_json_1["default"], signer);
                        return [4 /*yield*/, postManagerContractInstance.addComment(newCid, postData.postSCAddress, {
                                gasLimit: 1200000
                            })];
                    case 3:
                        hash = (_a.sent()).hash;
                        // (9) wait for transaction to be mined
                        return [4 /*yield*/, provider.waitForTransaction(hash)];
                    case 4:
                        // (9) wait for transaction to be mined
                        _a.sent();
                        // (10) display alert message
                        alert("Transaction sent! Hash: " + hash);
                        //call getAllPosts to refresh the current list
                        return [4 /*yield*/, getAllPosts()];
                    case 5:
                        //call getAllPosts to refresh the current list
                        _a.sent();
                        //reset fields back to default values
                        setCommentText("");
                        //call setActivePost to get updated comments
                        return [4 /*yield*/, setActivePost(postData, newCid)];
                    case 6:
                        //call setActivePost to get updated comments
                        _a.sent();
                        //close modal
                        closeModal();
                        _a.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_2 = _a.sent();
                        console.log(error_2);
                        closeModal();
                        alert("Error: " + error_2);
                        return [2 /*return*/, "" + error_2];
                    case 9: return [2 /*return*/];
                }
            });
        });
    }
    function setActivePost(postData, updatedCid) {
        return __awaiter(this, void 0, void 0, function () {
            var config, axiosResponse, postDataObject, currentPostData, ethereum, provider, signer, postContractInstance, imageName, imageCid, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        setLoadedData("Getting post details ...Please wait");
                        openModal();
                        config = {
                            method: "get",
                            url: "https://" + updatedCid + ".ipfs.w3s.link/post.json",
                            headers: {}
                        };
                        return [4 /*yield*/, axios_1["default"](config)];
                    case 1:
                        axiosResponse = _a.sent();
                        postDataObject = axiosResponse.data;
                        currentPostData = postDataObject.filter(function (data) { return data.post_ID === postData.postId; })[0];
                        ethereum = window.ethereum;
                        if (!ethereum) return [3 /*break*/, 4];
                        provider = new ethers_1.ethers.providers.Web3Provider(ethereum);
                        signer = provider.getSigner();
                        postContractInstance = new ethers_1.ethers.Contract(postData.postSCAddress, postABI_json_1["default"], signer);
                        return [4 /*yield*/, postContractInstance.imageName()];
                    case 2:
                        imageName = _a.sent();
                        return [4 /*yield*/, postContractInstance.imageCID()];
                    case 3:
                        imageCid = _a.sent();
                        setImageUrl("https://" + imageCid + ".ipfs.w3s.link/" + imageName);
                        setPostToActive(__assign(__assign({}, postData), { comments: currentPostData.comments, imageCID: imageCid, imageFilename: imageName }));
                        _a.label = 4;
                    case 4:
                        closeModal();
                        return [3 /*break*/, 6];
                    case 5:
                        error_3 = _a.sent();
                        console.log(error_3);
                        closeModal();
                        alert("Error: " + error_3);
                        return [2 /*return*/, "" + error_3];
                    case 6: return [2 /*return*/];
                }
            });
        });
    }
    function getWeb3StorageAPIkey() {
        return __awaiter(this, void 0, void 0, function () {
            var key;
            return __generator(this, function (_a) {
                key = process.env.NEXT_PUBLIC_WEB3_STORAGE_API_KEY;
                if (key != undefined) {
                    setToken(key);
                }
                return [2 /*return*/];
            });
        });
    }
    var customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            color: "black "
        }
    };
    //upload file function
    function MyDropzone() {
        var onDrop = react_1.useCallback(function (acceptedFiles) {
            var file = acceptedFiles[0];
            //check if file exists
            if (file == null) {
                throw "file error";
            }
            if (file) {
                //set file details into state variables
                setFilename(file.path);
                setFileDetails(file.path + " - " + file.size + " bytes");
            }
            //read file data with file reader function
            var reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onloadend = function () {
                var arraybufferData = reader.result;
                if (arraybufferData == null || typeof arraybufferData === "string") {
                    throw "buffer error";
                }
                var buffer = Buffer.from(new Uint8Array(arraybufferData));
                //set file data into state variable
                setFile(buffer);
            };
        }, []);
        var _a = react_dropzone_1.useDropzone({
            onDrop: onDrop,
            multiple: false,
            accept: {
                //restrict allow only jpeg/png/jpg file to be uploaded
                "image/png": [".png"],
                "image/jpeg": [".jpeg"],
                "image/jpg": [".jpg"]
            }
        }), getRootProps = _a.getRootProps, getInputProps = _a.getInputProps, isDragActive = _a.isDragActive;
        return (react_1["default"].createElement("div", __assign({ className: Home_module_css_1["default"].dropZoneStyle }, getRootProps()),
            react_1["default"].createElement("input", __assign({}, getInputProps())),
            isDragActive ? (react_1["default"].createElement("p", null, "Drop the files here ...")) : (react_1["default"].createElement("p", null, "Drag and drop your Image file here, or click to select file ((Only *.jpeg, *jpg and *.png images will be accepted))"))));
    }
    //render functions
    function renderAllPosts(allPosts) {
        return (react_1["default"].createElement("div", { className: Home_module_css_1["default"].createPostContainer },
            react_1["default"].createElement("p", { className: Home_module_css_1["default"].paragraphText },
                "Post ID: ",
                allPosts.postId + 1),
            react_1["default"].createElement("h4", { className: Home_module_css_1["default"].paragraphText },
                "Post Title: ",
                allPosts.postTitle),
            react_1["default"].createElement("p", { className: Home_module_css_1["default"].paragraphText },
                "Posted by: ",
                allPosts.posterWalletAddress),
            react_1["default"].createElement("p", { className: Home_module_css_1["default"].paragraphText },
                "No of comments : ",
                allPosts.noOfComments),
            react_1["default"].createElement("button", { className: Home_module_css_1["default"].viewPostBtn, onClick: function () {
                    setActivePost(allPosts, latestCid);
                } }, "View Post")));
    }
    function renderActivePost(postData) {
        return (react_1["default"].createElement("div", { className: Home_module_css_1["default"].activePostContainer },
            react_1["default"].createElement("div", null,
                react_1["default"].createElement("div", { style: { paddingLeft: "40px" } },
                    react_1["default"].createElement("h1", { className: Home_module_css_1["default"].paragraphText },
                        postData.postTitle,
                        " ")),
                react_1["default"].createElement("div", { style: { display: "flex" } },
                    react_1["default"].createElement("p", { className: Home_module_css_1["default"].detailsText }, "Post Smart contract address: "),
                    react_1["default"].createElement("p", { className: Home_module_css_1["default"].hyperlinkText },
                        react_1["default"].createElement(link_1["default"], { href: "https://sepolia.etherscan.io/address/" + postData.postSCAddress, target: "_blank" }, postData.postSCAddress))),
                react_1["default"].createElement("p", { className: Home_module_css_1["default"].detailsText },
                    "Posted by: ",
                    postData.posterWalletAddress,
                    " "),
                react_1["default"].createElement("div", { style: { display: "flex" } },
                    react_1["default"].createElement("p", { className: Home_module_css_1["default"].detailsText }, "CID: "),
                    react_1["default"].createElement("p", { className: Home_module_css_1["default"].hyperlinkText },
                        react_1["default"].createElement(link_1["default"], { href: "https://" + latestCid + ".ipfs.w3s.link/post.json", target: "_blank" }, latestCid))),
                react_1["default"].createElement("img", { src: imageUrl, alt: "your image file", width: 300, height: 300, style: { paddingLeft: "45px" } }),
                react_1["default"].createElement("h4", { className: Home_module_css_1["default"].activePostText },
                    postData.postContent,
                    " ")),
            react_1["default"].createElement("div", { style: {
                    padding: "5px"
                } },
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement("h4", { className: Home_module_css_1["default"].commentHeading }, (function () {
                        if (postData.comments.length === 1) {
                            return react_1["default"].createElement("div", null, postData.comments.length + " Comment");
                        }
                        else {
                            return react_1["default"].createElement("div", null, postData.comments.length + " Comments");
                        }
                    })()),
                    postData.comments.map(function (data) {
                        return (react_1["default"].createElement(react_1["default"].Fragment, null,
                            react_1["default"].createElement("div", { style: {
                                    border: "0",
                                    borderBottom: "2px",
                                    marginLeft: "35px",
                                    borderStyle: "solid"
                                } },
                                react_1["default"].createElement("div", { style: { margin: "10px" } }, "Comment by: " + data.comment_address),
                                react_1["default"].createElement("div", { style: { margin: "10px" } }, "Comment:  " + data.comment_content))));
                    }))),
            react_1["default"].createElement("div", { style: { marginTop: "20px", marginLeft: "50px" } },
                react_1["default"].createElement("label", null, "Add Comment"),
                react_1["default"].createElement("input", { type: "text", placeholder: "Enter text here", onChange: function (e) { return setCommentText(e.target.value); }, value: commentText, style: {
                        padding: "15px",
                        textAlign: "center",
                        display: "block",
                        backgroundColor: "black",
                        color: "white",
                        width: "400px",
                        marginBottom: "10px"
                    } })),
            react_1["default"].createElement("div", { style: {
                    marginLeft: "50px"
                } },
                react_1["default"].createElement("button", { className: Home_module_css_1["default"].postCommentBtn, onClick: function () { return postComment(postData); } }, "Submit comment"),
                react_1["default"].createElement("button", { className: Home_module_css_1["default"].backBtn, onClick: function () { return setPostToActive(null); } }, "Back to home page"))));
    }
    react_1.useEffect(function () {
        getAllPosts();
        getWeb3StorageAPIkey();
    }, []);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(head_1["default"], null,
            react_1["default"].createElement("title", null, "Forum dApp"),
            react_1["default"].createElement("meta", { name: "description", content: "Generated by create next app" }),
            react_1["default"].createElement("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
            react_1["default"].createElement("link", { rel: "icon", href: "/images.png" })),
        react_1["default"].createElement("div", { style: {
                backgroundColor: "white",
                minWidth: "500px",
                paddingBottom: "10px"
            } },
            react_1["default"].createElement("div", { className: Home_module_css_1["default"].topPanel },
                react_1["default"].createElement("div", { className: Home_module_css_1["default"].walletAddress }, "Forum dAPP"),
                react_1["default"].createElement("div", { className: Home_module_css_1["default"].walletAddress }, "Wallet Address: " + currentWalletAddress)),
            react_1["default"].createElement(react_modal_1["default"], { isOpen: isLoading, 
                //onRequestClose={closeModal}
                style: customStyles, contentLabel: "Example Modal" }, loadedData),
            react_1["default"].createElement("h2", { className: Home_module_css_1["default"].allPosts }, (function () {
                if (activePost == null) {
                    return react_1["default"].createElement("div", null, "All Posts");
                }
                else {
                    return react_1["default"].createElement("div", null, "");
                }
            })()),
            react_1["default"].createElement("div", null, activePost != null ? (renderActivePost(activePost)) : (react_1["default"].createElement(react_1["default"].Fragment, null,
                react_1["default"].createElement("div", null, allPosts.map(function (post) { return renderAllPosts(post); })),
                react_1["default"].createElement("div", { className: Home_module_css_1["default"].createPostContainer },
                    react_1["default"].createElement("h2", { className: Home_module_css_1["default"].createPostText }, "Create New Post "),
                    react_1["default"].createElement(MyDropzone, null),
                    react_1["default"].createElement("p", { style: { paddingLeft: "20px" } }, "" + fileDetails),
                    react_1["default"].createElement("div", { style: { margin: "20px" } },
                        react_1["default"].createElement("div", { style: { marginTop: "20px" } },
                            react_1["default"].createElement("label", null, "Post Title"),
                            react_1["default"].createElement("input", { type: "text", placeholder: "Add Post title here", onChange: function (e) { return setPostTitle(e.target.value); }, value: postTitle, style: {
                                    padding: "15px",
                                    textAlign: "center",
                                    display: "block",
                                    backgroundColor: "black",
                                    color: "white",
                                    width: "400px",
                                    marginBottom: "10px"
                                } })),
                        react_1["default"].createElement("div", { style: { marginTop: "20px" } },
                            react_1["default"].createElement("label", null, "Post Content"),
                            react_1["default"].createElement("input", { type: "text", placeholder: "Add Post Content here", onChange: function (e) { return setPostContent(e.target.value); }, value: postContent, style: {
                                    padding: "15px",
                                    textAlign: "center",
                                    display: "block",
                                    backgroundColor: "black",
                                    color: "white",
                                    width: "400px",
                                    marginBottom: "10px"
                                } })),
                        react_1["default"].createElement("button", { type: "button", className: Home_module_css_1["default"].createPostBtn, onClick: function () { return createPost(); } }, "Create a new Post")))))))));
}
exports["default"] = Home;
