<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">
                <div class="d-flex align-items-center justify-content-between welcome-content mb-3">
                    <div class="card card-block card-stretch card-transparent">
                        <div class="card-header d-flex justify-content-between pb-0">
                            <div class="header-title">
                                <h4 v-if="files?.length > 0" class="card-title">Files</h4>
                                <h4 v-if="files?.length < 1" class="card-title">No any file...</h4>
                            </div>
                        </div>
                    </div>

                    <div v-if="files?.length > 0" class="card-header-toolbar d-flex align-items-center">
                        <div class="card-header-toolbar">
                            <div class="dropdown">
                                <span
                                    id="dropdownMenuButton1"
                                    class="dropdown-toggle dropdown-bg btn bg-white"
                                    data-toggle="dropdown"
                                >
                                    Name<i class="ri-arrow-down-s-line ml-1"></i>
                                </span>
                                <div
                                    class="dropdown-menu dropdown-menu-right shadow-none"
                                    aria-labelledby="dropdownMenuButton1"
                                >
                                    <div class="dropdown-item" @click="sortDefault()">Default</div>
                                    <div class="dropdown-item" @click="sortAZ()">Title A-Z</div>
                                    <div class="dropdown-item" @click="sortZA()">Title Z-A</div>
                                    <div class="dropdown-item" @click="sortSizeLow()">Size smaller</div>
                                    <div class="dropdown-item" @click="sortSizeHigh()">Size bigger</div>
                                </div>
                            </div>
                        </div>
                        <h1>⠀</h1>
                        <div class="card-header-toolbar">
                            <div>
                                <div class="list-grid-toggle mr-4" @click="change()">
                                    <span v-if="data" class="icon icon-grid i-grid"
                                        ><i class="ri-layout-grid-line font-size-20"></i
                                    ></span>
                                    <span v-else class="icon i-list"><i class="ri-list-check font-size-20"></i></span>
                                    <span class="label label-list">List</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="data" class="icon icon-grid i-grid">
            <div class="row">
                <div v-for="(list, index) in files" :key="index" class="col-lg-3 col-md-6 col-sm-6">
                    <div class="card card-block card-stretch card-height">
                        <div class="card-body image-thumb">
                            <div class="mb-4 text-center p-3 rounded iq-thumb">
                                <div class="iq-image-overlay"></div>
                                <a :href="list.url" target="_blank"
                                    ><img :src="getPicture(list)" class="img-cnt img-fluid" :alt="`image${index}`"
                                /></a>
                            </div>
                            <h6 :title="list.title" class="file-title">{{ list.title }}</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="icon i-list">
            <div class="row">
                <div class="col-lg-12">
                    <div class="card card-block card-stretch card-height">
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table mb-0 table-borderless tbl-server-info">
                                    <thead>
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">Last Edit</th>
                                            <th scope="col">File Size</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(list, index) in files" :key="index">
                                            <td>
                                                <div class="d-flex align-items-center">
                                                    <div class="mr-3">
                                                        <a :href="list.url" target="_blank"
                                                            ><img
                                                                :src="getPicture(list)"
                                                                class="img-fluid avatar-30"
                                                                alt="img"
                                                        /></a>
                                                    </div>
                                                    <div v-if="!list.isEdit" :title="list.title" class="file-title">
                                                        {{ list.title }}
                                                    </div>
                                                    <div v-if="list.isEdit" class="file-title">
                                                        <input
                                                            v-model="input.title"
                                                            type="text"
                                                            class="width-inp-file add-inp"
                                                            :placeholder="getTitle(list.title)"
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <!-- <td>{{ list.owner }}</td> -->
                                            <td>{{ getDate(list.created_at) }}</td>
                                            <td>{{ getSize(list.size) }}</td>
                                            <td>
                                                <div class="opsss card-header-toolbar">
                                                    <div class="dropdown">
                                                        <span
                                                            id="dropdownMenuButton5"
                                                            class="dropdown-toggle"
                                                            data-toggle="dropdown"
                                                        >
                                                            <i class="ri-more-fill"></i>
                                                        </span>
                                                        <div class="dropdown-menu dropdown-menu-right">
                                                            <div
                                                                v-if="list.isEdit"
                                                                class="dropdown-item"
                                                                @click="save(list)"
                                                            >
                                                                <i class="ri-pencil-fill mr-2"></i>save
                                                            </div>
                                                            <div
                                                                v-if="list.isEdit"
                                                                class="dropdown-item"
                                                                @click="cancel(list)"
                                                            >
                                                                <i class="ri-delete-bin-6-fill mr-2"></i>cancel
                                                            </div>

                                                            <div v-if="!list.isEdit" @click="downloadFile(list)">
                                                                <div class="dropdown-item">
                                                                    <i class="ri-download-fill mr-2"></i>download
                                                                </div>
                                                            </div>

                                                            <div
                                                                v-if="!list.isEdit"
                                                                class="dropdown-item"
                                                                @click="edit(list)"
                                                            >
                                                                <i class="ri-pencil-fill mr-2"></i>edit
                                                            </div>
                                                            <hr
                                                                v-if="!list.isEdit"
                                                                style="margin-top: 0px; margin-bottom: 0px"
                                                            />
                                                            <div
                                                                v-if="!list.isEdit && !list.is_fav"
                                                                class="dropdown-item"
                                                                @click="addToFav(list.id)"
                                                            >
                                                                <i class="lar la-star mr-2"></i>like
                                                            </div>
                                                            <div
                                                                v-if="!list.isEdit && list.is_fav"
                                                                class="dropdown-item"
                                                                @click="removeFav(list.id)"
                                                            >
                                                                <i class="ri-star-fill mr-2"></i>unlike
                                                            </div>
                                                            <div
                                                                v-if="!list.isEdit"
                                                                class="dropdown-item"
                                                                @click="addToTrash(list.id)"
                                                            >
                                                                <i class="ri-delete-bin-6-fill mr-2"></i>trash
                                                            </div>
                                                            <div
                                                                v-if="!list.isEdit"
                                                                class="dropdown-item"
                                                                @click="deleteFromFolder(list.member_id)"
                                                            >
                                                                <i class="ri-recycle-line mr-2"></i>put away
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import axios from 'axios';

import { useRoute } from 'vue-router';
import FileServ from '@/models/file';

export default defineComponent({
    name: 'Images',
    setup() {
        const route = useRoute();
        const input = reactive({
            title: '',
            create: '',
        });
        return {
            input,
            route,
        };
    },
    data() {
        return {
            data: true,
            files: [] as FileServ[],
            ext: '',
        };
    },
    watch: {
        '$route.params.id': function () {
            // call the method which loads your initial state
            this.getAllFiles();
        },
    },
    async mounted() {
        this.$route.fullPath;
        await this.getAllFiles();
    },
    methods: {
        async sortDefault() {
            this.getAllFiles();
        },
        sortAZ() {
            this.files = this.files.sort((a, b) => a.title.localeCompare(b.title));
        },
        sortZA() {
            this.files = this.files.sort((a, b) => b.title.localeCompare(a.title));
        },
        sortSizeLow() {
            this.files = this.files.sort((a, b) => {
                return a.size - b.size;
            });
        },
        sortSizeHigh() {
            this.files = this.files.sort((a, b) => {
                return b.size - a.size;
            });
        },
        change() {
            this.data = !this.data;
        },
        getPicture(file: FileServ) {
            let ext = file.title.split('.').pop();
            ext = ext!.toUpperCase();
            if (ext === 'DOC' || ext === 'DOCX') {
                return require('@/assets/ext/doc.png');
            }
            if (ext === 'EXE') {
                return require('@/assets/ext/exe.png');
            }
            if (ext === 'ZIP') {
                return require('@/assets/ext/zip.png');
            }
            if (ext === 'PDF') {
                return require('@/assets/ext/pdf.png');
            }
            if (ext === 'PPT' || ext === 'PPTX') {
                return require('@/assets/ext/ppt.png');
            }
            if (ext === 'XML') {
                return require('@/assets/ext/xml.png');
            }
            if (ext === 'HTML') {
                return require('@/assets/ext/html.png');
            }
            if (ext === 'CSS') {
                return require('@/assets/ext/css.png');
            }
            if (ext === 'JS') {
                return require('@/assets/ext/javascript.png');
            }
            if (ext === 'JSON') {
                return require('@/assets/ext/json-file.png');
            }
            return require('@/assets/ext/136549.png');
        },
        getSize(size: number): string {
            const spec = size / 1024;
            return size > 1000 * 1024
                ? size > 1000000 * 1024
                    ? `${(spec / 1000000).toFixed(2)} GB`
                    : `${(spec / 1000).toFixed(2)} MB`
                : `${Math.ceil(spec)} KB`;
        },
        getDate(str: string) {
            const date = str.split('-').reverse();
            date[0] = date[0][0] + date[0][1];
            return `${date[0]}.${date[1]}.${date[2]}`;
        },
        removeFile(file: FileServ, index: number) {
            this.files.splice(index, 1);
            return this.files;
        },
        async downloadFile(file: FileServ) {
            const response = await axios.get(file.url, { responseType: 'blob' });
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = file.title;
            link.click();
            URL.revokeObjectURL(link.href);
            await axios.put(
                `/profile/downloads`,
                {},
                {
                    withCredentials: true,
                },
            );
        },
        edit(file: FileServ) {
            for (let i = 0; i < this.files.length; i++) {
                this.files[i].isEdit = false;
            }
            this.input.title = this.getTitle(file.title);
            file.isEdit = true;
        },
        async save(file: FileServ) {
            file.title = `${this.input.title}.${this.ext}`;
            this.ext = '';
            file.isEdit = false;
            await axios
                .put(
                    `/storage/files/title`,
                    {
                        id: file.id,
                        title: file.title,
                    },
                    {
                        withCredentials: true,
                    },
                )
                .then(() => {
                    this.getAllFiles();
                });
        },
        cancel(file: FileServ) {
            file.isEdit = false;
        },
        getTitle(str: string) {
            const inp = str.split('.');
            this.ext = inp[inp.length - 1];
            inp.splice(inp.length - 1, 1);
            return inp.join('');
        },
        async getAllFiles() {
            await axios
                .get(`/storage/folders/${this.route.params.id}`, {
                    withCredentials: true,
                })
                .then((response) => {
                    if (response.data) {
                        this.files = response!.data;
                    } else this.files = [];
                });
        },
        async addToFav(id: string) {
            await axios.put(
                `/storage/files/fav/`,
                {
                    id,
                },
                {
                    withCredentials: true,
                },
            );
            await this.getAllFiles();
        },
        async removeFav(id: string) {
            await axios.put(
                `/storage/files/fav/remove`,
                {
                    id,
                },
                {
                    withCredentials: true,
                },
            );
            await this.getAllFiles();
        },
        async addToTrash(id: string) {
            await axios.put(
                `/storage/files/trash/`,
                {
                    id,
                },
                {
                    withCredentials: true,
                },
            );
            await this.getAllFiles();
        },
        async deleteFromFolder(id: string | undefined) {
            await axios.delete(`/storage/folders/member/${id}`, {
                withCredentials: true,
            });
            await this.getAllFiles();
        },
    },
});
</script>

<style lang="scss">
.file-title {
    max-width: 350px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.img-cnt {
    border-radius: 5px;
}

.width-inp-file {
    width: 400px;
}

#dropdownMenuButton:hover {
    cursor: pointer;
}

.opsss :hover {
    cursor: pointer;
}

.file-title :hover {
    cursor: pointer;
}

.dropdown-menu {
    .item:hover {
        cursor: pointer;
    }
}

a {
    color: #535f6b;
}
</style>
