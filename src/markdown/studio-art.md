---
title: "Topological sampling data"
author: "obpp"
---
Here, we provide the input data and analysis results of our manuscript "Topology of synaptic connectivity constrains neuronal stimulus representation, predicting two complementary coding strategies" (https://www.biorxiv.org/content/10.1101/2020.11.02.363929v2). The inputs comprise descriptions of the neurons and connectivity of the model of Markram et al., 2015 (https://www.sciencedirect.com/science/article/pii/S0092867415011915) the identifiers of stimuli injected into the model during a simulation and the responses of excitatory neurons to the stimuli. You can find them under the "Input data" dashboard below.

In our code repository (https://github.com/BlueBrain/topological_sampling) you can find the pipeline we used to analyze these inputs and write the results to files. Alternatively, you can find the analysis result files on these pages under the "Analysis results" dashboard. These pages also contain analysis configuration files that specify parameters such as the number of samples to obtain or the number of random controls to generate. They are under the "Configurations" dashboard. Finally, these pages also contain jupyter notebooks that read the analysis results and use them to generate the figures of the manuscript, under the "Notebooks" dashboard.

A mirror of these data can be found on Zenodo (https://zenodo.org/record/4317336). Zenodo also provides these data a citable DOI.

## How to use the data

The data is provided in hdf5, json and pickle formats. Readers and writers are provided in out code repository (https://github.com/BlueBrain/topological_sampling). It is recommended to use them to access the data. For examples of this, refer to the jupyter notebooks under the "Notebooks" dashboard below.

The data is contained in a large number of files that have to be placed into specific location. We have decided to provide individual files instead of one single download, because a user might be interested in only a specific, small portion of the results. The downside is, that you have to create the expected directory structure manually. The structure is relative to a working directory that you can place anywhere in you file system. In the following sections we will call that location "root".

* Files you find under the "Configurations" dashboard below go into root/config
* The file you find under the "Notebooks" dashboard must be unzipped into root/notebooks
* Files you find under the "Input data" dashboard below go into root/data/input_data
* For files you find under the "Analysis results" dashboard, the location depends on the type:
  * Files with a .pkl or .json extension go into data/analyzed_data
  * Files with a .h5 extension go into a subdirectory of data/other that is named after the analysis step generating them. (For details, see below).

The expected structure with ALL files is as follows:

```
root/config:
    classifier_config.json
    common_config.json
    featurization_config.json
    input_data_config.json
    manifold_config.json
    sampling_config.json
    structural_analysis_config.json
    struc_volumetric_config.json
    topo_db_config.json
    triad_config.json

root/data/analyzed_data:
    classifier_features_results.json
    classifier_manifold_results.json
    community_database.pkl
    extracted_components.json
    features.json
    split_spike_trains.npy
    structural_parameters.json
    structural_parameters_vol.json
    triads.json
    tribes.json

root/data/input_data:
    connectivity.npz
    neuron_info.pickle
    raw_spikes.npy
    stim_stream.npy

root/data/other/classifier:
    all_results_components.h5
    all_results_features.h5

root/data/other/manifold_analysis:
    all_results.h5

root/data/other/topological_featurization:
    all_results.h5

root/notebooks:
    'Figure 1.ipynb'
    'Figure 2 - D, S6.ipynb'
    'Figure 2 , S2.ipynb'
    'Figure 3, S1.ipynb'
    'Figure 4, S9, S10.ipynb'
    'Figure 5.ipynb'
    'Figure 6 - A.ipynb'
    'Figure 6 - B, C, D.ipynb'
    'Figure 6 - F, G, H.ipynb'
    'Figure 7.ipynb'
    component_reacts_to_novelty.py
    figure_helper.py
    helper_functions.py
    pandas_helper.py
    plot_helpers.py
```

### But what ARE all these files?

The formatting of the input data files is described in the readme file of the code repository (https://github.com/BlueBrain/topological_sampling ). The analysis results are best understood in the context of the analysis pipeline step that generated them. To find out which step generated a file, you can refer to the high-level overview plot on the code repository page. Alternatively, this information is also encoded in the configuration:

1. Download the "common_config.json" from the "Configs" dashboard and open it
2. Within the config, navigate to "paths/analyzed" to find the shorthand label for the file of interest. Example: "database": "community_database.pkl" means, that the community_database.pkl is refered to as "database".
3. Navigate to "structure" to find the analysis steps that has the file of interest listed as "output". Example:

```json
"gen_topo_db": {
    "outputs": {
    "database": "analyzed"
}
```

means that the pipeline stage "gen_topo_db" is the one we are interested in for the purpose of this example.

4.    In the analysis code repository (https://github.com/BlueBrain/topological_sampling ) refer to the documentation / code for that pipeline stage.

## Use cases

Note that depending on what you want to achieve, you might not need all these files, but only a subset of them. In the following sections we will describe two use cases and how to achieve them

**"I want to run the in-depth analysis the same way you did for the manuscript"**

In this case you do not need the analysis results, because in running the analysis pipeline you will generate them yourself!

1. Obtain the code under https://github.com/BlueBrain/topological_sampling
2. Follow the instructions in the README of the repository to install the "toposample" and "pyflagsercontain" packages and their dependencies.
3. Obtain the files on these pages under the "Configurations" and "Input data" dashboards and place them into a working directory as described above. Note the location of the "common_config.json" file. The location of that file is the only input required by the subsequent steps of the analysis pipeline.
4. Run the steps of the analysis pipeline in order, as described in the README of the code repository. Each step is a python script that requires the location of the common_config.json as the only input.
5. Find the analysis results under root/data/analyzed_data . To get ideas what to do with them, you can download the jupyter notebooks under the "Notebooks" dashboard and see what we did to generate the figures.

**"I want to generate the figures you published in the manuscript / understand how you generated them"**

In that case you won't need the analysis pipeline code from our github. And depending on which figure you are interested in, you might not even need all the analysis results.

1. Create a working directory to put the data into. In the following steps I will call it "root".
2. Access the "Configuration" dashboard (left column below) and download the configuration files from it. Place them in root/configuration
3. Access the "Notebooks" dashboard and download the notebooks.zip file. Unzip it and place the notebooks into root/notebooks
4. Navigate to root/notebooks and launch jupyter notebook
5. Open the notebook corresponding to the figure you are interested in. In the second or third cell, the notebook will try to load the relevant data. Find that location and note the datasets you will need. For example, in Figure 1.ipynb you find:

```
"""
Paths to relevant data. 
"""
output_spikes_fn = cfg._cfg['inputs']['raw_spikes']
stim_fn = cfg._cfg['inputs']['stimuli']
tribes_fn = cfg._cfg['analyzed']['tribes']
```

This indicates you need from the dashboard "Input data" the files in the "raw_spikes" and "stimuli" dataset, and from the "Analysis results" dashboard the files in the "tribes" dataset. The "tribes" dataset refers to the selected neighborhoods of neurons in the model. The neighborhoods were unfortunately called "tribes" in an early version of the associated manuscript. While we were able to change the manuscript, the unfortunate term is too deeply embedded in the code to change without breaking things. We apologize for the confusion and any offense given.

6. Download the required files and place them as explained above
7. Run the rest of the notebook
